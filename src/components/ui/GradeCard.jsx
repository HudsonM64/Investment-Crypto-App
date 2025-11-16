import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function GradeCard({ grade }) {
  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #1E3A8A, #3B82F6)",
        color: "white",
        borderRadius: 3,
        p: 8,
        minHeight: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Grade
        </Typography>

        <Typography
          variant="h2"
          sx={{ mt: 1, fontWeight: "bold", letterSpacing: 2 }}
        >
          {grade || "--"}
        </Typography>
      </CardContent>
    </Card>
  );
}
