import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export default function PriceChartCard({ price_data, symbol }) {
  const [chartWidth, setChartWidth] = useState(0);
  const containerRef = useRef(null);

  const [forecast, setForecast] = useState(null);
  const [loadingForecast, setLoadingForecast] = useState(false);

  if (!price_data || price_data.length === 0) {
    return (
      <Card
        sx={{
          borderRadius: 3,
          p: 3,
          color: "text.primary",
          backgroundColor: "rgba(20,24,27,0.55)",
          border: "1px solid rgba(255,255,255,0.05)",
          width: "100%",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            30-Day Price History
          </Typography>
          <Typography color="text.secondary">
            No price data available.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // -----------------------------
  // Dynamic width resizing
  // -----------------------------
  useLayoutEffect(() => {
    if (containerRef.current) {
      setChartWidth(containerRef.current.getBoundingClientRect().width);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      if (!entries[0]) return;
      setChartWidth(entries[0].contentRect.width);
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // -----------------------------
  // Price data processing
  // -----------------------------
  const last30 = price_data.slice(0, 31);

  const yValues = last30.map((d) => Number(d.close)).reverse();

  const pastDates = last30
    .map((d) =>
      new Date(d.datetime).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    )
    .reverse();

  const pastX = Array.from({ length: yValues.length }, (_, i) => i);

  // -----------------------------
  // Fetch forecast from backend
  // -----------------------------
  const fetchForecast = async () => {
    try {
      setLoadingForecast(true);
      setForecast(null);

      const res = await fetch(`/api/forecast/${symbol}`);
      const json = await res.json();
      setForecast(json);
    } catch (err) {
      console.error("Forecast error:", err);
    } finally {
      setLoadingForecast(false);
    }
  };

  // -----------------------------
  // If we HAVE a forecast, extend x-axis
  // -----------------------------
  const combinedX = forecast
    ? [
        ...pastX,
        ...Array.from(
          { length: forecast.predictions.length },
          (_, i) => pastX.length + i
        ),
      ]
    : pastX;

  const combinedDates = forecast
    ? [
        ...pastDates,
        ...forecast.dates.map((d) =>
          new Date(d).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })
        ),
      ]
    : pastDates;

  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 3,
        color: "text.primary",
        backgroundColor: "rgba(20,24,27,0.55)",
        border: "1px solid rgba(255,255,255,0.05)",
        width: "900px",
        position: "relative",
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          30-Day Price History
        </Typography>

        {/* Forecast Button */}
        <Button
          variant="outlined"
          onClick={fetchForecast}
          disabled={loadingForecast}
          sx={{
            mb: 2,
            borderColor: "#29F2C8",
            color: "#29F2C8",
            textTransform: "none",
            fontWeight: 600,
            borderRadius: "12px",
            px: 3,
            "&:hover": {
              borderColor: "#29F2C8",
              backgroundColor: "rgba(41,242,200,0.1)",
            },
          }}
        >
          {loadingForecast ? "Generating..." : "Generate 30-Day Forecast"}
        </Button>

        <Box
          ref={containerRef}
          sx={{ height: 500, width: "100%", position: "relative" }}
        >
          {/* Loading overlay */}
          {loadingForecast && (
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backdropFilter: "blur(3px)",
                zIndex: 10,
              }}
            >
              <CircularProgress size={40} sx={{ color: "#29F2C8" }} />
            </Box>
          )}

          <LineChart
            width={Math.max(chartWidth || 0, 360)}
            height={500}
            xAxis={[
              {
                data: combinedX,
                valueFormatter: (v) => combinedDates[v] || "",
                tickLabelStyle: { fill: "rgba(232,241,241,0.7)" },
                axisLineStyle: { stroke: "rgba(232,241,241,0.25)" },
              },
            ]}
            yAxis={[
              {
                tickLabelStyle: { fill: "rgba(232,241,241,0.7)" },
                axisLineStyle: { stroke: "rgba(232,241,241,0.25)" },
              },
            ]}
            grid={{
              horizontal: true,
              vertical: false,
              strokeDasharray: "4 4",
              stroke: "rgba(232,241,241,0.15)",
            }}
            series={[
              {
                data: yValues,
                curve: "catmullRom",
                color: "#29F2C8",
                showMark: false,
              },

              forecast && {
                data: Array(pastX.length)
                  .fill(null)
                  .concat(forecast.predictions),
                curve: "catmullRom",
                color: "#ffffff",
                showMark: false,
                lineStyle: {
                  strokeDasharray: "6 4",
                  opacity: 0.9,
                },
              },
            ].filter(Boolean)}
            slotProps={{
              legend: { hidden: true },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
