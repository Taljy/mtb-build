import type {
  JumpCalculatorParams,
  JumpCalculatorResult,
  LandingCalculatorParams,
  LandingCalculatorResult,
  BermCalculatorParams,
  BermCalculatorResult,
} from "@/types";

const G = 9.81; // m/s²
const TRAJECTORY_STEPS = 50;

// ────────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────────

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

// ────────────────────────────────────────────────────────────────────
// computeJump
// ────────────────────────────────────────────────────────────────────

export function computeJump(params: JumpCalculatorParams): JumpCalculatorResult {
  const { speedKmh, lipAngleDeg, lipHeightCm, wheelbaseCm } = params;
  const warnings: string[] = [];

  const v0 = speedKmh / 3.6;
  const hLip = lipHeightCm / 100;
  const θ = toRad(lipAngleDeg);

  // Energy conservation: v_lip² = v0² - 2·g·h
  const vLipSq = v0 * v0 - 2 * G * hLip;
  if (vLipSq <= 0) {
    warnings.push("Anfahrtsspeed zu niedrig für Lippenhöhe");
  }
  const vLip = Math.sqrt(Math.max(0, vLipSq));

  const sinθ = Math.sin(θ);
  const cosθ = Math.cos(θ);

  const range = vLip > 0 ? (vLip * vLip * Math.sin(2 * θ)) / G : 0;
  const maxHeight = vLip > 0 ? (vLip * vLip * sinθ * sinθ) / (2 * G) : 0;
  const flightTime = vLip > 0 ? (2 * vLip * sinθ) / G : 0;
  const rangeKorr = Math.max(0, range - (wheelbaseCm / 100) * sinθ);

  if (range > 0 && range < 1) warnings.push("Reichweite sehr klein (< 1 m)");
  if (maxHeight > 2) warnings.push("Sehr hohe Flugbahn (> 2 m)");
  if (wheelbaseCm / 100 > range && range > 0)
    warnings.push("Radstand länger als Sprungweite");

  // Trajectory: 50 points along parabola
  const trajectoryPoints: { x: number; y: number }[] = [];
  for (let i = 0; i <= TRAJECTORY_STEPS; i++) {
    const t = (flightTime * i) / TRAJECTORY_STEPS;
    trajectoryPoints.push({
      x: round2(vLip * cosθ * t),
      y: round2(vLip * sinθ * t - 0.5 * G * t * t),
    });
  }

  return {
    range: round2(rangeKorr),
    maxHeight: round2(maxHeight),
    flightTime: round2(flightTime),
    exitSpeedMs: round2(vLip),
    trajectoryPoints,
    warnings,
  };
}

// ────────────────────────────────────────────────────────────────────
// computeLanding
// ────────────────────────────────────────────────────────────────────

export function computeLanding(
  params: LandingCalculatorParams
): LandingCalculatorResult {
  const { takeoffSpeedKmh, takeoffAngleDeg, landingSlopeDeg, heightOffsetM } =
    params;
  const warnings: string[] = [];

  const v0 = takeoffSpeedKmh / 3.6;
  const θ = toRad(takeoffAngleDeg);
  const slopeRad = toRad(landingSlopeDeg);

  const vLip = v0; // No lip height offset for landing calculator
  const sinθ = Math.sin(θ);
  const cosθ = Math.cos(θ);

  if (landingSlopeDeg < 5) {
    warnings.push("Horizontale Landung gefährlich — mind. 25° empfohlen");
  }

  // Sample 50 points across 0..8 m horizontal distance
  const efhProfile: { x: number; efh: number }[] = [];
  let maxEfh = 0;
  let maxEfhX = 0;

  for (let i = 0; i <= TRAJECTORY_STEPS; i++) {
    const x = (8 * i) / TRAJECTORY_STEPS;
    if (vLip * cosθ === 0) break;

    const t = x / (vLip * cosθ);
    const yTraj = vLip * sinθ * t - 0.5 * G * t * t;
    const yLand = -Math.tan(slopeRad) * x + heightOffsetM;

    // Only compute EFH where trajectory is above or near landing slope
    if (yTraj < yLand - 2) break; // far below landing — stop

    const vx = vLip * cosθ;
    const vy = vLip * sinθ - G * t;

    // Perpendicular velocity component to landing slope
    const vPerp = Math.abs(vx * Math.sin(slopeRad) - vy * Math.cos(slopeRad));
    const efh = round2((vPerp * vPerp) / (2 * G));

    efhProfile.push({ x: round2(x), efh });

    if (efh > maxEfh) {
      maxEfh = efh;
      maxEfhX = x;
    }
  }

  if (maxEfh > 1.2) {
    warnings.push(
      `EFH überschreitet 1.2 m bei x = ${maxEfhX.toFixed(1)} m`
    );
  }

  return {
    efhProfile,
    maxEfh: round2(maxEfh),
    warnings,
    isSafe: maxEfh <= 1.2,
  };
}

// ────────────────────────────────────────────────────────────────────
// computeBerm
// ────────────────────────────────────────────────────────────────────

export function computeBerm(params: BermCalculatorParams): BermCalculatorResult {
  const { speedKmh, radiusM, practiceCorrection } = params;
  const warnings: string[] = [];

  const v = speedKmh / 3.6;
  const theoreticalAngle = round2(toDeg(Math.atan(v * v / (G * radiusM))));
  const practicalAngle = practiceCorrection
    ? Math.max(theoreticalAngle - 7, 15)
    : theoreticalAngle;
  const centripetalG = round2((v * v) / (G * radiusM));

  if (centripetalG > 1.5)
    warnings.push("Zentripetalkraft > 1.5 g — Skill 'Fortgeschritten'");
  if (practicalAngle > 60)
    warnings.push("Sehr steiler Anlieger, schwer zu verlassen");
  if (practicalAngle < 20 && speedKmh > 25)
    warnings.push("Anlieger zu flach für diesen Speed");
  if (radiusM < 2)
    warnings.push("Radius unter 2 m — Mindestradius unterschritten");

  return {
    theoreticalAngle,
    practicalAngle: round2(practicalAngle),
    centripetalG,
    warnings,
  };
}
