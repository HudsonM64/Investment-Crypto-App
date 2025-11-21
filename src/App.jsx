 import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Grid,
  Button,
  Autocomplete,
  TextField,
  Container,
  Paper,
  Card,
  CardContent,
} from "@mui/material";
import Xlist from "./components/Xlist";
import QuotePanel from "./components/QuotePanel";
import { useQuote } from "./hooks/useQuote";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";

function App({ darkMode, setDarkMode }) {
  const [search, setSearch] = useState("ETR");

  const stocks = [
    { symbol: "ETR", name: "Entergy Corporation", price: 106.32 },
    { symbol: "LAMR", name: "Lamar Advertising Company", price: 114.58 },
    { symbol: "POOL", name: "Pool Corporation", price: 370.41 },
    { symbol: "LUMN", name: "Lumen Technologies, Inc.", price: 1.46 },
  ];
  
  return (
    <>
      <Header stocks={stocks} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/:symbol" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );


  const { data: quote, status } = useQuote(search?.toUpperCase() || "", 5000);

  
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (ticker) => {
    if (!favorites.includes(ticker)) {
      setFavorites([...favorites, ticker]);
    }
  };

  const removeFavorite = (ticker) => {
    setFavorites(favorites.filter((f) => f !== ticker));
  };

  return (
    <Box sx={{ minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static" color="primary" sx={{ mb: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Stock Tracker
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Grid container spacing={2} sx={{ width: "auto" }}>
              {stocks.map((stock) => (
                <Grid item key={stock.symbol}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      px: 1,
                    }}
                  >
                    <Typography variant="subtitle2">{stock.symbol}</Typography>
                    <Typography variant="body2">
                      ${stock.price.toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            {/* Dark Mode Toggle */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? "Light Mode" : "Dark Mode"}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Hero Section / Search */}
      <Box
        sx={{
          py: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Find Your Stock
        </Typography>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Autocomplete
            freeSolo
            options={stocks.map((s) => s.symbol)}
            value={search}
            onInputChange={(_, newValue) => setSearch(newValue || "")}
            sx={{
              width: "80%",
              maxWidth: 400,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Type a stock symbol..."
              />
            )}
          />
          <Button
            variant="contained"
            color="success"
            onClick={() => addFavorite(search.toUpperCase())}
          >
            Pin
          </Button>
        </Box>

        <Box sx={{ mt: 3 }}>
          {status === "error" ? (
            <Typography color="error">Failed to load quote.</Typography>
          ) : (
            <QuotePanel q={quote} />
          )}
        </Box>
      </Box>

      {/* Favorites Section */}
      <Container sx={{ my: 4 }}>
        <Typography variant="h5" gutterBottom>
          Pinned Favorites
        </Typography>

        {favorites.length === 0 ? (
          <Typography>No pinned stocks yet.</Typography>
        ) : (
          <Grid container spacing={2}>
            {favorites.map((ticker) => {
              const stock = stocks.find((s) => s.symbol === ticker);
              return (
                <Grid item key={ticker}>
                  <Card>
                    <CardContent
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="subtitle1">{ticker}</Typography>
                      <Typography variant="body2">
                        ${stock?.price.toFixed(2) ?? "..."}
                      </Typography>
                      <Button
                        size="small"
                        color="secondary"
                        sx={{ mt: 1 }}
                        onClick={() => removeFavorite(ticker)}
                      >
                        Unpin
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>

      {/* X News List */}
      <Container sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Xlist theme={darkMode ? "dark" : "light"} listId="1977888287458045976" />
        </Paper>
      </Container>

      {/* Info / FAQs */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" gutterBottom>
          Info / FAQs
        </Typography>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">What to look for</Typography>
            <Typography variant="body1">
              Look for the Market cap, Volatility, and Liquidity.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6">The metric of the algorithm</Typography>
            <Typography variant="body1">
              The algorithm calculates a reliability score based on market cap and
              volatility, producing grades like 'F', 'D', 'C', 'B', or 'A'.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">How the algorithm works</Typography>
            <Typography variant="body1">
              It analyzes Market cap, Volatility, and Liquidity to produce a two-part rating, e.g., "C6" or "B10".
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default App;

