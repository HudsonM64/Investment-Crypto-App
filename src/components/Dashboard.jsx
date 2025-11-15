import React from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  AppBar,
  Toolbar,
  Paper,
  Container,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";
import Xlist from "./Xlist";

export default function Dashboard() {
  const { symbol } = useParams(); 

  // Placeholder grade/description
  const grade = {
    grade: "A1",
    description: "Description",
  };

  // Placeholder data
  const data = [
    { x: "2025-01-01", y: 120 },
    { x: "2025-01-02", y: 125 },
    { x: "2025-01-03", y: 130 },
    { x: "2025-01-04", y: 128 },
    { x: "2025-01-05", y: 134 },
  ];

  const stocks = [
    { symbol: "ETR", name: "Entergy Corporation", price: 106.32 },
    { symbol: "LAMR", name: "Lamar Advertising Company", price: 114.58 },
    { symbol: "POOL", name: "Pool Corporation", price: 370.41 },
    { symbol: "LUMN", name: "Lumen Technologies, Inc.", price: 1.46 },
  ];

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
        <Box p={3}
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
        <Grid container spacing={3}>
            {/* Grade Card */}
            <Grid item xs={12} md={4}>
            <Card sx={{ height: "400px", p: 2, display: "flex", alignItems: "center" }}>
                <CardContent sx={{ width: "200px" }}>

                <Typography variant="h3" fontWeight="bold" textAlign="center" fontSize="100px">
                    {grade.grade}
                </Typography>

                <Typography 
                    variant="h6"
                    color="text.secondary"
                    textAlign="center"
                    fontSize="30px"
                    sx={{ mb: 2 }}
                >
                    {symbol?.toUpperCase() || "SYMBOL"}
                </Typography>

                <Typography variant="body1" textAlign="center">
                    {grade.description}
                </Typography>
                </CardContent>
            </Card>
            </Grid>

            {/* Chart */}
            <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: "400px" }}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                {symbol?.toUpperCase() || "SYMBOL"} Price History
                </Typography>

                <Box sx={{ width: "800px", height: 350 }}>
                <LineChart
                    xAxis={[
                    {
                        id: "dates",
                        data: data.map((p) => p.x),
                        scaleType: "band",
                    },
                    ]}
                    series={[
                    {
                        id: "price",
                        data: data.map((p) => p.y),
                    },
                    ]}
                    height={350}
                />
                </Box>
            </Paper>
            </Grid>
        </Grid>
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