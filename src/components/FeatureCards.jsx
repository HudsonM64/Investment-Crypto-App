import { Grid, Paper, Typography, Box } from "@mui/material";

const features = [
  {
    title: "Volatility",
    desc: "Volatility is how much a stock price fluctuates over time.",
  },
  {
    title: "Market Cap",
    desc: "Market capitalization measures the total value of a company.",
  },
  {
    title: "Liquidity",
    desc: "Liquidity represents how easily a stock can be bought or sold.",
  },
];

export default function FeatureCards() {
  return (
    <Box sx={{ mb: 10 }}>
      <Grid container spacing={4} justifyContent="center">
        {features.map((f) => (
          <Grid item xs={12} md={4} key={f.title}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                height: "100%",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
                {f.title}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {f.desc}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
