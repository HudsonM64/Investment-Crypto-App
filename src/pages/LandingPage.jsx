import { useState } from "react";
import { Box, Container } from "@mui/material";

import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorksSection";
import FeatureCards from "../components/FeatureCards";
import GradingSystem from "../components/GradingSystemSection";
import { fadeInUp, fadeInUpDelayed, MotionDiv } from "../animations/animate";

export default function LandingPage() {
  const [results, setResults] = useState([]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        backgroundImage:
          "radial-gradient(circle at 80% 0%, rgba(41,242,200,0.22), transparent 55%)",
        color: "text.primary",
        py: { xs: 6, md: 10 },
      }}
    >
      <Container maxWidth="lg">
        <HeroSection results={results} setResults={setResults} />
        <Box sx={{ mt: "20vh" }}>
            <HowItWorks />
        </Box>

        <Box sx={{ mt: "30vh" }}>
          <MotionDiv {...fadeInUpDelayed(0.15)}>
            <FeatureCards />
          </MotionDiv>
        </Box>

        <Box sx={{ mt: "30vh" }}>
          <MotionDiv {...fadeInUpDelayed(0.15)}>
            <GradingSystem />
          </MotionDiv>
        </Box>
      </Container>
    </Box>
  );
}
