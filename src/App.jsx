import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Grid,
  TextField,
  Paper,
  Card,
  CardContent,
  Autocomplete,
} from "@mui/material";
import Xlist from "./components/Xlist";
import QuotePanel from "./components/QuotePanel";
import { useQuote } from "./hooks/useQuote";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./components/Dashboard";

export default function App() {
    return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/:symbol" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}