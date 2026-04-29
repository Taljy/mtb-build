import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App";
import Home from "./pages/Home";
import ModuleList from "./pages/ModuleList";
import ModuleDetail from "./pages/ModuleDetail";
import GeometryHub from "./pages/GeometryHub";
import JumpCalculator from "./pages/JumpCalculator";
import LandingCalculator from "./pages/LandingCalculator";
import BermCalculator from "./pages/BermCalculator";
import Material from "./pages/Material";
import Compliance from "./pages/Compliance";
import Plan from "./pages/Plan";
import PrintSheet from "./pages/PrintSheet";
import PrintPlan from "./pages/PrintPlan";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
    element: <PrintPlan />,
  },
  {
    path: "/print/:slug",
    element: <PrintSheet />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
