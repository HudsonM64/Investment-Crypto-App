import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function DescriptionCard({ name, description }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 3,
        backgroundColor: "rgba(20,24,27,0.55)",
        border: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 16px 36px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
        width: '500px'
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {name || "Company Name"}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          {description ||
            "Company description goes here. You can place any long text here."}
        </Typography>
      </CardContent>
    </Card>
  );
}
