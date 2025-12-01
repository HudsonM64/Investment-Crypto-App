import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function GradeCard({ grade }) {
  return (
    <Card
      sx={{
        borderRadius: 2,
        p: 4,
        minHeight: 210,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(145deg, rgba(41, 242, 200, 0.16), rgba(11, 14, 15, 0.9))",
        border: "1px solid rgba(41, 242, 200, 0.28)",
        boxShadow: "0 18px 44px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
        color: "text.primary",
        width: '210px'
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, letterSpacing: 0.4 }}>
          Grade
        </Typography>

        <Typography variant="h1" sx={{ mt: 1, fontWeight: 800, letterSpacing: 1 }}>
          {grade || "--"}
        </Typography>
      </CardContent>
    </Card>
  );
}
