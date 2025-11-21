import React from "react";
import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
export default function LiveQuoteCard({ price_data }) {
  const curr_price = Number(price_data[0].close).toFixed(2);
  const getChange = () => {
    const newPrice = Number(price_data[0].close);
    const oldPrice = Number(price_data[1].close);
    const change = ((newPrice - oldPrice) / oldPrice) * 100;
    return change.toFixed(2);
  };
  const isNegative = parseFloat(getChange()) < 0;

  return (
    <Card
      sx={{
        background: "#fff",
        borderRadius: 3,
        p: 2,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
        minHeight: 150,
        maxWidth: 450
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: "600", color: "#1E3A8A" }}>
          Current Price
        </Typography>
        <Stack display="flex" flexDirection="row" alignItems="center" gap={3}>
          <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
            {curr_price || "--"}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mt: 1,
              color: isNegative ? "#DC2626" : "#16A34A",
              fontWeight: 600,
            }}
          >
            {getChange() ? `${getChange()}%` : ""} 
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
