import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

export default function DescriptionCard({ name, description }) {
  return (
    <Card
      sx={{
        background: "#EFF6FF",
        borderRadius: 3,
        p: 2,
        height: "90%",
        maxWidth: 500,
        minWidth: 500
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "#1E3A8A" }}>
          {name || "Company Name"}
        </Typography>

        <Typography variant="body1" sx={{ mt: 2, color: "#1E293B" }}>
          {description ||
            "Company description goes here. You can place any long text here."}
        </Typography>
      </CardContent>
    </Card>
  );
}
