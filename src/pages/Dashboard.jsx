import React from "react";
import { Grid, Box } from "@mui/material";

import GradeCard from "../components/ui/GradeCard";
import MetricCard from "../components/ui/MetricCard";
import DescriptionCard from "../components/ui/DescriptionCard";
import LiveQuoteCard from "../components/ui/LiveQuoteCard";
import PriceChartCard from "../components/ui/PriceChartCard";
import { useLocation, useParams } from "react-router-dom";

export default function Dashboard() {
  const { state: data } = useLocation();
  const { symbol } = useParams();

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
      </Box>
    </Box>
  );
}
