import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export default function PriceChartCard({ price_data }) {
  const [chartWidth, setChartWidth] = useState(0);
  const containerRef = useRef(null);

  if (!price_data || price_data.length === 0) {
    return (
      <Card
        sx={{
          borderRadius: 3,
          p: 3,
          color: "text.primary",
          boxShadow:
            "0 18px 44px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
          backgroundColor: "rgba(20,24,27,0.55)",
          border: "1px solid rgba(255,255,255,0.05)",
          width: "100%",
          height: "100%",
        }}
      >
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            30-Day Price History
          </Typography>
          <Typography color="text.secondary">No price data available.</Typography>
        </CardContent>
      </Card>
    );
  }

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

  const last30 = price_data.slice(0, 31);

  const yValues = last30.map(d => Number(d.close)).reverse();
  const dates = last30
    .map(d =>
      new Date(d.datetime).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })
    )
    .reverse();

  const xValues = Array.from({ length: yValues.length }, (_, i) => i);

  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 3,
        color: "text.primary",
        boxShadow:
          "0 18px 44px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        backgroundColor: "rgba(20,24,27,0.55)",
        border: "1px solid rgba(255,255,255,0.05)",
        width: "900px",
      }}
    >
      <CardContent sx={{ height: "100%" }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          30-Day Price History
        </Typography>

        <Box ref={containerRef} sx={{ height: 500, width: "100%" }}>
          <LineChart
            width={Math.max(chartWidth || 0, 360)}
            xAxis={[
              {
                data: xValues,
                tickLabelStyle: { fill: "rgba(232,241,241,0.7)" },
                axisLineStyle: { stroke: "rgba(232,241,241,0.25)" },
                valueFormatter: v => dates[v],
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
            ]}
            height={500}
            slotProps={{
              legend: { hidden: true },
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
