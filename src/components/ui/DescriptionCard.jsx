import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import PinButton from "../PinButton";

export default function DescriptionCard({ name, symbol, description, price }) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 3,
        backgroundColor: "rgba(20,24,27,0.55)",
        border: "1px solid rgba(255,255,255,0.05)",
        boxShadow: "0 16px 36px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
        width: "500px",
        position: "relative",
      }}
    >
      {/* Pin Button in top-right */}
      <Box sx={{ position: "absolute", top: 15, right: 25 }}>
        <PinButton symbol={symbol || name} price={price} />
      </Box>

      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          {name || "Company Name"}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          {description || "Company description goes here."}
        </Typography>
      </CardContent>
    </Card>
  );
}
