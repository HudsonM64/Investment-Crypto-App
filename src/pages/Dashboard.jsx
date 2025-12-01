import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, CircularProgress } from "@mui/material";

import GradeCard from "../components/ui/GradeCard";
import MetricCard from "../components/ui/MetricCard";
import DescriptionCard from "../components/ui/DescriptionCard";
import LiveQuoteCard from "../components/ui/LiveQuoteCard";
import PriceChartCard from "../components/ui/PriceChartCard";
import { useLocation, useParams } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();
  const { symbol } = useParams();
  const [data, setData] = useState(location.state);
  const [loading, setLoading] = useState(!location.state);
  const [error, setError] = useState("");

  useEffect(() => {
    // If we already have state for the same symbol, skip fetch
    if (location.state && location.state.symbol?.toUpperCase() === symbol?.toUpperCase()) {
      setData(location.state);
      setLoading(false);
      setError("");
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch(`http://127.0.0.1:8000/analyze/${symbol}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (json.error) throw new Error(json.error);
        setData(json);
      } catch (err) {
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol, location.state]);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        py: 4,
        background: `
          radial-gradient(circle at 80% 12%, rgba(41, 242, 200, 0.16), rgba(11, 14, 15, 0) 32%),
          radial-gradient(circle at 20% 80%, rgba(41, 242, 200, 0.08), rgba(11, 14, 15, 0) 28%),
          #0b0e0f
        `,
        color: "text.primary",
      }}
    >
      {/* FULL WIDTH GRID WRAPPER */}
      <Box sx={{ width: "100%", px: { xs: 2, md: 3 } }}>
        {loading && (
          <Box sx={{ py: 6, display: "flex", justifyContent: "center" }}>
            <CircularProgress color="primary" />
          </Box>
        )}

        {!loading && error && (
          <Box sx={{ py: 6, textAlign: "center" }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Unable to load data
            </Typography>
            <Typography color="text.secondary">{error}</Typography>
          </Box>
        )}

        {!loading && !error && data && (
        <Grid container spacing={3} alignItems="stretch">
          {/* TOP ROW */}
          <Grid item xs={12} md={3}>
            <GradeCard grade={data.grade} />
          </Grid>

          <Grid item xs={12} md={3}>
            <MetricCard
              title="Market Cap"
              value={data.market_cap?.value}
              condition={data.market_cap?.condition}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <MetricCard
              title="Liquidity"
              value={data.liquidity?.value}
              condition={data.liquidity?.condition}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <MetricCard
              title="Volatility"
              value={data.volatility?.value}
              condition={data.volatility?.condition}
            />
          </Grid>

          {/* LEFT COLUMN (Description + LiveQuote stacked) */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <DescriptionCard
                name={data.symbol || symbol}
                description={data.description}
              />
              <LiveQuoteCard price_data={data.price_data} />
            </Box>
          </Grid>

          <Grid item xs={12} md={8} sx={{ display: "flex", flexDirection: "column" }}>
            <PriceChartCard price_data={data.price_data} />
          </Grid>
        </Grid>
        )}
      </Box>
    </Box>
  );
}
