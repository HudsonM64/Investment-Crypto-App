import { Box, Typography } from "@mui/material";
import SearchBar from "./SearchBar";
import SearchDropdown from "./SearchDropdown";

export default function HeroSection({ results, setResults }) {
  return (
    <Box
      sx={{
        textAlign: "left",
        pt: { xs: 10, md: 18 },
        pb: { xs: 10, md: 16 },
        maxWidth: "900px",
        mx: "auto",
        position: "relative",

        "&::before": {
          content: '""',
          position: "absolute",
          top: "40%",
          left: "60%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(41,242,200,0.15), transparent 60%)",
          filter: "blur(60px)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Typography
        variant="h2"
        sx={{
          fontWeight: 600,
          mb: 2,
          fontSize: { xs: "2.2rem", md: "3.4rem" },
          letterSpacing: "-0.5px",
        }}
      >
        Find Your Stock
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        sx={{
          maxWidth: "500px",
          mb: 4,
          fontSize: "1.05rem",
          lineHeight: 1.6,
        }}
      >
        Search any ticker to explore performance, volatility, and liquidity
        details in one place.
      </Typography>

      <Box sx={{ maxWidth: "500px" }}>
        <SearchBar setResults={setResults} />
        {results.length > 0 && <SearchDropdown results={results} />}
      </Box>
    </Box>
  );
}
