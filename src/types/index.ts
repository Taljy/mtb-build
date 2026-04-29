/**
 * Public Type-API für mtb-build
 *
 * Konsumenten importieren via:
 *   import type { Module, SkillVariant, JumpCalculatorParams } from "@/types";
 */

export type {
  Module,
  SkillVariant,
  ModuleCategory,
  SkillLevel,
  FoundationType,
  PrefabInfo,
  SafetyInfo,
} from "./Module";

export type {
  Geometry,
  JumpGeometry,
  LandingGeometry,
  BermGeometry,
  DropGeometry,
  SkinnyGeometry,
  TeeterGeometry,
  NorthshoreGeometry,
  PumptrackGeometry,
  JumpCalculatorParams,
  JumpCalculatorResult,
  LandingCalculatorParams,
  LandingCalculatorResult,
  BermCalculatorParams,
  BermCalculatorResult,
} from "./Geometry";

export type {
  BomItem,
  BomCategory,
  BomUnit,
  BillOfMaterials,
  ComputedBomItem,
  ComputedBom,
} from "./BillOfMaterials";

export type {
  Material,
  MaterialCategory,
  MaterialCatalog,
} from "./Material";

export type {
  Plan,
  PlanPhase,
} from "./Plan";
