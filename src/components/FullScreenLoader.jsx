import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const FullScreenLoader = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(6px)",
        zIndex: 9999,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 4,
          borderRadius: 3,
          boxShadow: "0 10px 35px rgba(0, 0, 0, 0.08)",
          backgroundColor: "#ffffff",
          border: "1px solid rgba(226, 232, 240, 0.8)",
          minWidth: 220,
        }}
      >
        <Box sx={{ position: "relative", display: "inline-flex", mb: 2.5 }}>
          {/* Background Track */}
          <CircularProgress
            variant="determinate"
            sx={{
              color: "#e2e8f0",
            }}
            size={54}
            thickness={4.5}
            value={100}
          />
          {/* Animated Spinner */}
          <CircularProgress
            variant="indeterminate"
            disableShrink
            sx={{
              color: "#2563eb",
              animationDuration: "800ms",
              position: "absolute",
              left: 0,
            }}
            size={54}
            thickness={4.5}
          />
        </Box>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 700,
            color: "#1e293b",
            letterSpacing: "-0.3px",
            mb: 0.3,
          }}
        >
          ProdNomics ERP
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: "#64748b",
            fontWeight: 500,
            fontSize: "0.82rem",
          }}
        >
          Loading module...
        </Typography>
      </Box>
    </Box>
  );
};

export default FullScreenLoader;
