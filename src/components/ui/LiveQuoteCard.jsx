import React from "react";
import { Card, CardContent, Typography, Stack } from "@mui/material";

export default function LiveQuoteCard({ price_data }) {

  if (!price_data || price_data.length < 2) {
    return (
      <Card sx={{ borderRadius: 3, p: 3, minHeight: 180 }}>
        <CardContent>
          <Typography variant="h6">Current Price</Typography>
          <Typography variant="h4" sx={{ mt: 2 }}>--</Typography>
        </CardContent>
      </Card>
    );
  }

  const curr_price = Number(price_data[0]?.close).toFixed(2);

  const getChange = () => {
    const newPrice = Number(price_data[0]?.close);
    const oldPrice = Number(price_data[1]?.close);

    if (isNaN(newPrice) || isNaN(oldPrice)) return 0;

    const change = ((newPrice - oldPrice) / oldPrice) * 100;
    return change.toFixed(2);
  };

  const isNegative = parseFloat(getChange()) < 0;

  return (
    <Card
      sx={{
        borderRadius: 3,
        p: 3,
        boxShadow:
          "0 16px 36px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
        minHeight: 180,
        backgroundColor: "rgba(20,24,27,0.55)",
        border: "1px solid rgba(255,255,255,0.05)",
        maxWidth: 350,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          Current Price
        </Typography>

        <Stack
          display="flex"
          flexDirection="row"
          alignItems="center"
          gap={3}
        >
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
            {`${getChange()}%`}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}
