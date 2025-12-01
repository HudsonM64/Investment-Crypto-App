import React from "react";
import { useNavigate } from "react-router-dom";
import { ListItemButton, ListItemText, Typography } from "@mui/material";

const SearchResult = ({ result }) => {
  const navigate = useNavigate();

  const navigateToDashboard = (data) => {
    navigate(`/dashboard/${result.symbol.toUpperCase()}`, { state: data });
  };

  const evaluateStock = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/analyze/${result.symbol.toUpperCase()}`
      );
      const data = await response.json();
      if (data.error) {
        alert(data.error || "Stock not available");
        return;
      }

      navigateToDashboard(data);
      console.log(data)
      
    } catch (error) {
      console.log("Error fetching data from backend: ", error);
      alert("Error fetching data");
    }
  };

  return (
    <ListItemButton
      onClick={evaluateStock}
      sx={{
        px: 2,
        py: 1.25,
        color: "text.primary",
        "&:hover": { bgcolor: "rgba(41, 242, 200, 0.08)" },
        "&:active": { bgcolor: "rgba(41, 242, 200, 0.14)" },
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <ListItemText
        primary={
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {result.symbol}
          </Typography>
        }
        secondary={
          <Typography variant="caption" color="text.secondary">
            {result.instrument_name}
          </Typography>
        }
      />
    </ListItemButton>
  );
};

export default SearchResult;
