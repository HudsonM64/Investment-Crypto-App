import { Paper, Typography, Box } from "@mui/material";

export default function GradingSystem() {
  return (
    <Box sx={{ mb: 10 }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: 4,
          maxWidth: "900px",
          mx: "auto",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: 600, mb: 2 }}>
          Our Grading System
        </Typography>
        <Typography variant="body1" color="text.secondary">
          We use a dual-scale system to assign a precise grade to each stock, 
          ranging from F0 → A10. Using machine learning, we detect patterns in 
          recent performance and determine reliability and momentum at a deeper level.
        </Typography>
      </Paper>
    </Box>
  );
}
