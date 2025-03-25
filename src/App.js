import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Overview from "./pages/overview";
import Emissions from "./pages/emissions";
import Parameters2 from "./pages/parameters";
import Simulations from "./pages/simulations";
import SimulationsNew from "./pages/simulationsNew";
import FAQ from "./pages/faq";

// ScrollToTop component to scroll to the top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router basename="/tokenomics">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Overview />} />
          <Route path="emissions" element={<Emissions />} />
          <Route path="parameters" element={<Parameters2 />} />
          <Route path="simulations" element={<Simulations />} />
          <Route path="simulationsNew" element={<SimulationsNew />} />
          <Route path="faq" element={<FAQ />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
