import { NavLink } from "react-router-dom";

const links = [
  { to: "/geometrie",          label: "HUB",      end: true },
  { to: "/geometrie/sprung",   label: "SPRUNG" },
  { to: "/geometrie/landung",  label: "LANDUNG" },
  { to: "/geometrie/anlieger", label: "ANLIEGER" },
];

export default function GeometrySubNav() {
  return (
    <nav className="flex items-center gap-6 border-b border-rule pb-4 mb-8">
      {links.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            [
              "flex items-center gap-1.5 font-mono text-xs tracking-[0.18em] uppercase transition-colors no-underline",
              isActive ? "text-vermillion" : "text-asphalt hover:text-ink",
            ].join(" ")
          }
        >
          {({ isActive }) => (
            <>
              {isActive && <span aria-hidden>•</span>}
              {label}
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
