import React, { useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Layout from "./components/Layout";
import Overview from "./pages/overview";
import Emissions from "./pages/emissions";
import Parameters2 from "./pages/parameters";
import Simulations from "./pages/simulations";
import SimulationsNew from "./pages/simulationsNew";
import FAQ from "./pages/faq";

// ScrollToTop component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="emissions" element={<Emissions />} />
          <Route path="parameters" element={<Parameters2 />} />
          <Route path="simulations" element={<Simulations />} />
          <Route path="simulationsNew" element={<SimulationsNew />} />
          <Route path="faq" element={<FAQ />} />

          {/* Fallback redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}
