import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function MetricCard({ title, value, condition, color }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 16px 36px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
        p: 3,
        minHeight: 180,
        textAlign: "center",
        backgroundColor: "rgba(20,24,27,0.55)",
        border: "1px solid rgba(255,255,255,0.05)",
        minWidth: 350
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>

        <Typography variant="h4" sx={{ mt: 1, fontWeight: 800 }}>
          {value || "--"}
        </Typography>

        <Typography
          variant="body1"
          sx={{ mt: 1, color: color || "primary.main", fontWeight: 600 }}
        >
          {condition || ""}
        </Typography>
      </CardContent>
    </Card>
  );
}
