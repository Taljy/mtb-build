# DREK MTB-BUILD

Field Manual für den privaten MTB-Bikepark — mtb-build.drek.ch

## Stack

- React 19 + TypeScript (strict)
- Vite + Rolldown
- Tailwind v4 (`@theme` tokens, kein config-file)
- shadcn/ui mit Base UI primitives
- React Router v6

## Design-System

DREK HELL v1.1 — paper `#F2EDE4`, ink `#0D0D0D`, vermillion `#E34234`.
Keine Radius (`--radius: 0rem`), keine Schatten.

## Seiten

| Route | Seite |
|---|---|
| `/` | Home & Build-Status |
| `/module` | Modulkatalog |
| `/module/:slug` | Moduldetail mit BOM-Tabelle |
| `/geometrie` | Geometrie-Hub |
| `/geometrie/sprung` | Sprung-Rechner (parabolische Trajektorie) |
| `/geometrie/landung` | Landungs-Rechner (EFH-Verifikation) |
| `/geometrie/anlieger` | Anlieger-Rechner (Banking-Winkel) |
| `/material` | Material & Budgetkonfigurator |
| `/compliance` | Recht & Sicherheit |
| `/plan` | Aufbau-Sequenz |
| `/print/:slug` | Druckblatt Modul (A4) |
| `/print/plan` | Druckblatt Bauplan (A4) |

## Dev

```bash
npm install
npm run dev        # http://localhost:5176
npm run build
npm run preview
```
