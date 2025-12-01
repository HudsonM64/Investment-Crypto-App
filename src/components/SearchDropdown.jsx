import React from "react";
import { Paper, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import SearchResult from "./SearchResult";

function SearchDropdown({ results }) {
  if (!results?.length) return null;

  return (
    <Paper
      elevation={6}
      sx={{
        position: "absolute",
        marginTop: 2,
        left: 0,
        width: "100%",
        maxHeight: 260,
        overflowY: "auto",
        borderRadius: 2,
        border: "1px solid rgba(41, 242, 200, 0.2)",
        bgcolor: "rgba(12,16,18,0.94)",
        backdropFilter: "blur(10px)",
        boxShadow: "0 14px 38px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
        zIndex: (theme) => theme.zIndex.modal,
      }}
    >
      <List dense disablePadding>
        {results.map((result, id) => (
          <SearchResult key={id} result={result} />
        ))}
      </List>
    </Paper>
  );
}

export default SearchDropdown;
