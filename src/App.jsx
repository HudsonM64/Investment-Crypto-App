import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AnimatePresence } from "framer-motion";

import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import theme from "./themes/theme";
import PageTransition from "./animations/PageTransition";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/:symbol" element={<Dashboard />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
}

export default function App() {
  const stocks = [
    { symbol: "ETR", name: "Entergy Corporation", price: 106.32 },
    { symbol: "LAMR", name: "Lamar Advertising Company", price: 114.58 },
    { symbol: "POOL", name: "Pool Corporation", price: 370.41 },
    { symbol: "LUMN", name: "Lumen Technologies, Inc.", price: 1.46 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <BrowserRouter>
        <Header stocks={stocks} />

        <AnimatedRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}
