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
import { useQuote } from "./hooks/useQuote";
import { useNavigate } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import SearchDropdown from "./components/SearchDropdown";
import './styles/LandingPage.css'

export default function LandingPage() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const stocks = [
    { symbol: "ETR", name: "Entergy Corporation", price: 106.32 },
    { symbol: "LAMR", name: "Lamar Advertising Company", price: 114.58 },
    { symbol: "POOL", name: "Pool Corporation", price: 370.41 },
    { symbol: "LUMN", name: "Lumen Technologies, Inc.", price: 1.46 },
  ];

  // Poll every 5s for the current symbol
  const { data: quote, status } = useQuote(search?.toUpperCase() || "", 5000);

  return (
    <Box sx={{ bgcolor: "#585a5cff", minHeight: "100vh" }}>
      {/* Header */}
      <AppBar position="static" color="primary" sx={{ mb: 2 }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Stock Tracker
          </Typography>
          <Grid container spacing={2} sx={{ width: "auto" }}>
            {stocks.map((stock) => (
              <Grid item key={stock.symbol}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    color: "white",
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
        </Toolbar>
      </AppBar>

      {/* Hero Section with Search */}
        <Box
          sx={{
            py: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            justifyContent: "center",
            bgcolor: "#8a8a8bff",
            minHeight: "70vh",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Find Your Stock
          </Typography>
          <div className="search-wrapper">
            <SearchBar setResults={setResults} />
            {results.length > 0 && <SearchDropdown results={results} />}
          </div>
        </Box>

      {/* X News List (static embed) */}
      <Container sx={{ my: 4 }}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Xlist theme="light" listId="1977888287458045976" />
        </Paper>
      </Container>

      {/* Info / FAQs */}
      <Container className="content" sx={{ py: 6 }}>
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
              The algorithm collects and calculates these values and assigns the
              stock a "reliability score" that’s based on market cap and
              volatility, resulting in a grade like 'F', 'D', 'C', 'B', or 'A'.
            </Typography>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6">How the algorithm works</Typography>
            <Typography variant="body1">
              It analyzes three factors: Market cap, Volatility, and Liquidity.
              The algorithm produces a "reliability score" and assigns a
              two-part rating, such as "C6" or "B10".
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
