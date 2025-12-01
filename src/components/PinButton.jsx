// src/components/ui/PinButton.jsx
import React, { useEffect, useState } from "react";
import PushPinIcon from "@mui/icons-material/PushPin";
import PushPinOutlinedIcon from "@mui/icons-material/PushPinOutlined";
import { IconButton, Tooltip } from "@mui/material";

export default function PinButton({ symbol, price }) {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("pinnedStocks") || "[]");
    setPinned(saved.some((s) => s.symbol === symbol));
  }, [symbol]);

  const togglePin = () => {
    let saved = JSON.parse(localStorage.getItem("pinnedStocks") || "[]");

    if (pinned) {
      // remove
      saved = saved.filter((s) => s.symbol !== symbol);
    } else {
      // add with static price
      saved.push({ symbol, price });
    }

    localStorage.setItem("pinnedStocks", JSON.stringify(saved));
    setPinned(!pinned);
    window.dispatchEvent(
      new CustomEvent("pinnedStocksUpdated", { detail: saved })
    );
  };

  return (
    <Tooltip title={pinned ? "Unpin" : "Pin"}>
      <IconButton
        onClick={togglePin}
        size="small"
        sx={{
          color: pinned ? "#29F2C8" : "rgba(255,255,255,0.6)",
          "&:hover": { color: "#29F2C8" },
        }}
      >
        {pinned ? <PushPinIcon /> : <PushPinOutlinedIcon />}
      </IconButton>
    </Tooltip>
  );
}
