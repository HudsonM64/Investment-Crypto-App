import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";

export default function PriceChartCard({ price_data }) {
  const last30 = price_data.slice(0, 31)

  const get_y_values = () => {
    let y_values = [];
    last30.forEach((day) => {
      y_values.push(Number(day.close));
    });

    return y_values.reverse();
  };

  const dates = last30.map(day => {
    const d = new Date(day.datetime);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  });

  dates.reverse()
  const x_values = Array.from({length: 31}, (_, i) => i); // Array of length 30

  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #1E3A8A, #3B82F6)",
        borderRadius: 3,
        p: 2,
        color: "white",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.15)",
        height: 600,
        width: "97%",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
          30-Day Price History
        </Typography>

        <Box sx={{ height: 350 }}>
          <LineChart
            xAxis={[
              {
                data: x_values,
                tickLabelStyle: { fill: "rgba(255,255,255,0.7)" },
                axisLineStyle: { stroke: "rgba(255,255,255,0.3)" },
                valueFormatter: (value) => dates[value],
              },
            ]}
            yAxis={[
              {
                tickLabelStyle: { fill: "rgba(255,255,255,0.7)" },
                axisLineStyle: { stroke: "rgba(255,255,255,0.3)" },
              },
            ]}
            grid={{
              horizontal: true,
              vertical: false,
              strokeDasharray: "4 4",
              stroke: "rgba(255,255,255,0.2)",
            }}
            series={[
              {
                data: get_y_values(),
                curve: "catmullRom",
                color: "#A5B4FC",
                showMark: true,
                markStyle: {
                  fill: "#FFFFFF",
                  stroke: "#FFFFFF",
                  r: 4,
                },
                valueFormatter: (value) => `$${value.toFixed(2)}`,
              },
            ]}
            slotProps={{
              legend: { hidden: true },
            }}
            height={500}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
