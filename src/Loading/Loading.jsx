import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body1">Loading Details...</Typography>
    </Box>
  );
}

export default Loading;
