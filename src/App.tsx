import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DrekLogo from "@/components/DrekLogo";

const navLinks = [
  { to: "/",          label: "HOME",       end: true },
  { to: "/module",    label: "MODULE" },
  { to: "/geometrie", label: "GEOMETRIE" },
  { to: "/material",  label: "MATERIAL" },
  { to: "/compliance",label: "COMPLIANCE" },
  { to: "/plan",      label: "PLAN" },
];

const desktopLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "flex items-center gap-1.5 font-mono text-xs tracking-[0.18em] uppercase transition-colors",
    isActive ? "text-vermillion" : "text-asphalt hover:text-ink",
  ].join(" ");

const mobileLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    "display-s transition-colors",
    isActive ? "text-vermillion" : "text-pitch hover:text-vermillion",
  ].join(" ");

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      {/* ── Header ───────────────────────────────────────────── */}
      <header className="h-16 sticky top-0 z-50 border-b border-rule bg-paper">
        <div className="mx-auto flex h-full max-w-[1280px] items-center justify-between px-[clamp(1rem,4vw,4rem)]">
          {/* Wordmark */}
          <NavLink to="/" className="flex items-center gap-0 no-underline">
            <DrekLogo height={28} />
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt border-l border-rule pl-3 ml-3">
              MTB-BUILD
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} className={desktopLinkClass}>
                {({ isActive }) => (
                  <>
                    {isActive && <span aria-hidden>•</span>}
                    {label}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Burger */}
          <button
            type="button"
            className="md:hidden text-ink p-3"
            onClick={() => setOpen(true)}
            aria-label="Menü öffnen"
          >
            <Menu size={20} strokeWidth={1.5} />
          </button>
        </div>
      </header>

      {/* ── Mobile overlay ───────────────────────────────────── */}
      {open && (
        <div className="fixed inset-0 z-50 flex flex-col bg-paper">
          <div className="flex h-16 items-center justify-between border-b border-rule px-[clamp(1rem,4vw,4rem)]">
            <DrekLogo height={28} />
            <button
              type="button"
              className="text-ink p-3"
              onClick={() => setOpen(false)}
              aria-label="Menü schliessen"
            >
              <X size={20} strokeWidth={1.5} />
            </button>
          </div>
          <nav className="flex flex-col gap-6 px-[clamp(1rem,4vw,4rem)] pt-12">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={mobileLinkClass}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}

      {/* ── Main ─────────────────────────────────────────────── */}
      <main className="flex-1">
        <div className="mx-auto max-w-[1280px] px-[clamp(1rem,4vw,4rem)] py-12">
          <Outlet />
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-rule bg-paper py-8">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-[clamp(1rem,4vw,4rem)] sm:flex-row sm:items-baseline sm:justify-between">
          {/* Left */}
          <div className="flex items-center gap-3">
            <DrekLogo height={20} />
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt">
              MTB-BUILD · v0.1
            </span>
          </div>

          {/* Right — phase status */}
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-vermillion">
              PHASE 0 · SETUP — DONE
            </span>
            <span className="font-mono text-xs tracking-[0.18em] uppercase text-asphalt">
              PHASE 1 · DESIGN-SYSTEM — IN ARBEIT
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
