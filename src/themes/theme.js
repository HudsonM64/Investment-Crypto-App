import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: "#29F2C8", // neon mint / teal accent
      light: "#5FF7DA",
      dark: "#0BA88A",
    },

    secondary: {
      main: "#0EA5A3",
    },

    background: {
      default: "#0B0E0F", // obsidian black
      paper: "rgba(255,255,255,0.03)", // translucent for cards & panels
    },

    text: {
      primary: "#E8F1F1", // soft white
      secondary: "#9BA8A8", // slate gray
      disabled: "#566565",
    },

    divider: "rgba(255,255,255,0.06)",
  },

  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,

    h1: {
      fontSize: "3.2rem",
      fontWeight: 600,
      letterSpacing: "-0.5px",
      color: "#E8F1F1",
    },
    h2: {
      fontSize: "2.6rem",
      fontWeight: 600,
      letterSpacing: "-0.4px",
      color: "#E8F1F1",
    },
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      letterSpacing: "-0.2px",
      color: "#E8F1F1",
    },
    h6: {
      fontWeight: 500,
      color: "#E8F1F1",
    },
    body1: {
      fontSize: "1rem",
      color: "#9BA8A8",
      lineHeight: 1.6,
    },
    body2: {
      fontSize: "0.9rem",
      color: "#94A3A3",
    },
    button: {
      fontWeight: 500,
      letterSpacing: "0.5px",
      textTransform: "none",
    },
  },

  shape: {
    borderRadius: 16,
  },

  components: {
    // GLASSMORPHIC PAPERS (cards, panels)
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.03)", // light transparency
          backdropFilter: "blur(22px)", // frosted effect
          borderRadius: "20px",
          border: "1px solid rgba(41,242,200,0.2)", // neon mint edge
          boxShadow: `
            0 0 20px rgba(41,242,200,0.08),
            0 0 1px rgba(41,242,200,0.4),
            inset 0 0 20px rgba(41,242,200,0.05)
          `,
        },
      },
    },

    // GLASSMORPHIC CARDS
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.03)",
          backdropFilter: "blur(22px)",
          borderRadius: "20px",
          border: "1px solid rgba(41,242,200,0.2)",
          boxShadow: `
            0 0 20px rgba(41,242,200,0.08),
            0 0 1px rgba(41,242,200,0.4),
            inset 0 0 20px rgba(41,242,200,0.05)
          `,
        },
      },
    },

    // INPUTS & SEARCH BAR
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255,255,255,0.04)",
          borderRadius: 14,
          backdropFilter: "blur(12px)",
          transition: "0.2s ease",

          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(41,242,200,0.4)",
          },

          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "#29F2C8",
            boxShadow: "0 0 8px rgba(41,242,200,0.6)",
          },
        },
        notchedOutline: {
          borderColor: "rgba(255,255,255,0.1)",
        },
        input: {
          color: "#E8F1F1",
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#8FA3A3",
        },
      },
    },

    // BUTTONS
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 22px",
          backgroundImage:
            "linear-gradient(135deg, rgba(41,242,200,0.15), rgba(41,242,200,0.05))",
          boxShadow: "0 0 14px rgba(41,242,200,0.13)",
          transition: "all 0.25s ease",

          "&:hover": {
            backgroundColor: "rgba(41,242,200,0.25)",
            boxShadow: "0 0 20px rgba(41,242,200,0.25)",
          },
        },
      },
    },

    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: "24px !important",
          paddingRight: "24px !important",
        },
      },
    },
  },
});

export default theme;
