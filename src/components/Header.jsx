import React from "react";

import { AppBar, Toolbar, Box, Typography, Grid } from "@mui/material";

const Header = ({ stocks }) => {
  return (
    <AppBar position="static" color="primary" sx={{ mb: 2, boxShadow: "none", m: 0, p: 0}} elevation={0}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          Stock Tracker
        </Typography>
        <Grid container spacing={2} sx={{ width: "auto" }}>
          {stocks.map((stock) => (
            <Grid item key={stock.symbol}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  color: "white",
                  px: 1,
                }}
              >
                <Typography variant="subtitle2">{stock.symbol}</Typography>
                <Typography variant="body2">
                  ${stock.price.toFixed(2)}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
