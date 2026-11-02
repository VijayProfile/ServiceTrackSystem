import React from "react";
import { Box, Typography, Button, Grid, Paper, Stack } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: { xs: 2, md: 4 },
        background: "#f4f7fc",
      }}
    >
      {/* Welcome Section */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          color: "white",
          background: "linear-gradient(135deg, #172554 0%, #2563eb 100%)",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight={800} mb={1}>
          Welcome Back!
        </Typography>

        <Typography color="#dbeafe" mb={3}>
          Manage your support tickets easily and efficiently.
        </Typography>

        <Button
          variant="contained"
          startIcon={<AddCircleOutlinedIcon />}
          endIcon={<ArrowForwardIcon />}
          onClick={() => navigate("/create-ticket")}
          sx={{
            background: "#ffffff",
            color: "#1d4ed8",
            px: 3,
            py: 1.5,
            borderRadius: 2,
            fontWeight: 700,
            textTransform: "none",
            "&:hover": {
              background: "#dbeafe",
              transform: "translateY(-2px)",
            },
          }}
        >
          Create Ticket
        </Button>
      </Paper>

      {/* Dashboard Cards */}
      <Grid container spacing={3}>
        {/* My Tickets */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid #e2e8f0",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.07)",
              },
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: "#dbeafe",
                  color: "#2563eb",
                }}
              >
                <ConfirmationNumberOutlinedIcon fontSize="large" />
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700}>
                  My Tickets
                </Typography>

                <Typography color="text.secondary">
                  View and manage your tickets.
                </Typography>
              </Box>
            </Stack>

            <Button
              onClick={() => navigate("/view-ticket")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                mt: 3,
                textTransform: "none",
              }}
            >
              View Tickets
            </Button>
          </Paper>
        </Grid>

        {/* Track Tickets */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid #e2e8f0",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0 10px 25px rgba(0,0,0,0.07)",
              },
            }}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Box
                sx={{
                  p: 2,
                  borderRadius: 2,
                  background: "#dcfce7",
                  color: "#16a34a",
                }}
              >
                <AccessTimeOutlinedIcon fontSize="large" />
              </Box>

              <Box>
                <Typography variant="h6" fontWeight={700}>
                  Track Tickets
                </Typography>

                <Typography color="text.secondary">
                  Check your ticket progress.
                </Typography>
              </Box>
            </Stack>

            <Button
              onClick={() => navigate("/track-ticket")}
              endIcon={<ArrowForwardIcon />}
              sx={{
                mt: 3,
                textTransform: "none",
              }}
            >
              Track Status
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
