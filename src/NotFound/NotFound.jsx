import React from "react";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigates = useNavigate();
  return (
    <div>
      <img
        src="public/notfound.jpg"
        alt="Page Not Found"
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "block",
          margin: "0 auto",
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigates("/home")}
        >
          Back
        </Button>
      </Box>
    </div>
  );
}

export default NotFound;
