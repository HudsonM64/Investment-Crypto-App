import { StrictMode, useState, useMemo } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import App from "./App.jsx";

function Root() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
          primary: { main: darkMode ? "#90caf9" : "#1976d2" },
          secondary: { main: darkMode ? "#f48fb1" : "#d81b60" },
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App darkMode={darkMode} setDarkMode={setDarkMode} />
    </ThemeProvider>
  );
}

createRoot(document.getElementById("root")).render(
    <Root />
);
