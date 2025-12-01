import { Paper, Typography, Box } from "@mui/material";

export default function HowItWorks() {
  return (
    <Box sx={{ mb: 10 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 1,
          maxWidth: "900px",
          mx: "auto",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          How it works
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Our algorithm analyzes and grades stocks based on volatility, market cap, 
          and liquidity to determine if they’re worth investing in. We evaluate each 
          stock's performance based on the past 90 days to ensure the most accurate 
          grading possible.
        </Typography>
      </Paper>
    </Box>
  );
}
