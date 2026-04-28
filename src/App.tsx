import { NavLink, Outlet } from "react-router-dom";

const navLinks = [
  { to: "/", label: "HOME", end: true },
  { to: "/module", label: "MODULE" },
  { to: "/geometrie", label: "GEOMETRIE" },
  { to: "/material", label: "MATERIAL" },
  { to: "/compliance", label: "COMPLIANCE" },
  { to: "/plan", label: "PLAN" },
];

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-paper text-ink">
      <header className="border-b border-rule">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-[clamp(1rem,4vw,4rem)] py-4">
          <NavLink to="/" className="flex items-baseline gap-3 no-underline">
            <span className="font-display text-2xl tracking-wider text-pitch">
              DREK
            </span>
            <span className="font-mono text-xs tracking-[0.18em] text-asphalt uppercase">
              MTB-BUILD
            </span>
          </NavLink>

          <nav className="flex items-center gap-6">
            {navLinks.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  [
                    "font-mono text-xs tracking-[0.18em] uppercase transition-colors",
                    isActive ? "text-vermillion" : "text-asphalt hover:text-ink",
                  ].join(" ")
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <div className="mx-auto max-w-[1280px] px-[clamp(1rem,4vw,4rem)] py-12">
          <Outlet />
        </div>
      </main>

      <footer className="border-t border-rule">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-[clamp(1rem,4vw,4rem)] py-4">
          <span className="font-mono text-xs tracking-[0.18em] text-asphalt uppercase">
            DREK · MTB-BUILD · v0.1
          </span>
          <span className="font-mono text-xs tracking-[0.18em] text-asphalt uppercase">
            PHASE 0 · SETUP
          </span>
        </div>
      </footer>
    </div>
  );
}
