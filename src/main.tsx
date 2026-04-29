import { lazy, Suspense, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";

const Home            = lazy(() => import("./pages/Home"));
const ModuleList      = lazy(() => import("./pages/ModuleList"));
const ModuleDetail    = lazy(() => import("./pages/ModuleDetail"));
const GeometryHub     = lazy(() => import("./pages/GeometryHub"));
const JumpCalculator  = lazy(() => import("./pages/JumpCalculator"));
const LandingCalculator = lazy(() => import("./pages/LandingCalculator"));
const BermCalculator  = lazy(() => import("./pages/BermCalculator"));
const Material        = lazy(() => import("./pages/Material"));
const Compliance      = lazy(() => import("./pages/Compliance"));
const Plan            = lazy(() => import("./pages/Plan"));
const PrintSheet      = lazy(() => import("./pages/PrintSheet"));
const PrintPlan       = lazy(() => import("./pages/PrintPlan"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center font-mono text-xs tracking-[0.18em] uppercase text-asphalt">LADE…</div>}>
        <App />
      </Suspense>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "module", element: <ModuleList /> },
      { path: "module/:slug", element: <ModuleDetail /> },
      { path: "geometrie", element: <GeometryHub /> },
      { path: "geometrie/sprung", element: <JumpCalculator /> },
      { path: "geometrie/landung", element: <LandingCalculator /> },
      { path: "geometrie/anlieger", element: <BermCalculator /> },
      { path: "material", element: <Material /> },
      { path: "compliance", element: <Compliance /> },
      { path: "plan", element: <Plan /> },
    ],
  },
  {
    path: "/print/plan",
    element: (
      <Suspense fallback={null}>
        <PrintPlan />
      </Suspense>
    ),
  },
  {
    path: "/print/:slug",
    element: (
      <Suspense fallback={null}>
        <PrintSheet />
      </Suspense>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
