import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function MetricCard({ title, value, condition, color }) {
  return (
    <Card
      sx={{
        background: '#fff',
        borderRadius: 3,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        p: 4,
        minHeight: 120,
        minWidth: 325,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h4" sx={{ fontWeight: "600", color: "#1E3A8A" }}>
          {title}
        </Typography>

        <Typography variant="h5" sx={{ mt: 1, fontWeight: "bold" }}>
          {value || "--"}
        </Typography>

        <Typography
          variant="h5"
          sx={{ mt: 1, color: "#3B82F6", fontWeight: 500 }}
        >
          {condition || ""}
        </Typography>
      </CardContent>
    </Card>
  );
}
