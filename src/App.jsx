import { useState } from "react";
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

function App({ darkMode, setDarkMode }) {
  const [search, setSearch] = useState("ETR");

  const stocks = [
    { symbol: "ETR", name: "Entergy Corporation", price: 106.32 },
    { symbol: "LAMR", name: "Lamar Advertising Company", price: 114.58 },
    { symbol: "POOL", name: "Pool Corporation", price: 370.41 },
    { symbol: "LUMN", name: "Lumen Technologies, Inc.", price: 1.46 },
  ];

  const { data: quote, status } = useQuote(search?.toUpperCase() || "", 5000);

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

      {/* Hero Section */}
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

        <Box sx={{ mt: 3 }}>
          {status === "error" ? (
            <Typography color="error">Failed to load quote.</Typography>
          ) : (
            <QuotePanel q={quote} />
          )}
        </Box>
      </Box>

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
