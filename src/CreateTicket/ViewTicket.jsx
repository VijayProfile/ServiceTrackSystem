import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Alert,
  Divider,
  InputAdornment,
} from "@mui/material";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import { useNavigate } from "react-router-dom";

function ViewTicket() {
  const [userId, setUserId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  // Priority Color
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "error";
      case "medium":
        return "warning";
      case "low":
        return "success";
      default:
        return "default";
    }
  };

  // Status Color
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "open":
        return "warning";
      case "pending":
      case "in progress":
        return "info";
      case "resolved":
      case "closed":
        return "success";
      case "high":
        return "error";
      default:
        return "default";
    }
  };

  // View Ticket API
  const viewTickets = async (e) => {
    e.preventDefault();

    if (!userId.trim()) {
      setError("Please enter a valid User ID");
      return;
    }

    setLoading(true);
    setError("");
    setTicket(null);

    try {
      const response = await axios.get(
        "https://mytkt.runasp.net/api/User/ViewMyTicket",
        {
          params: {
            userId: userId.trim(),
          },
        },
      );

      if (response.data) {
        setTicket(response.data);
        setUserId("");
      } else {
        setError("No ticket details found.");
        setUserId("");
      }
    } catch (err) {
      setUserId("");
      console.log(err.response?.data || err.message);

      const message = err.response?.data;

      setError(
        typeof message === "string"
          ? message
          : message?.message || "Unable to fetch ticket details",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f7fb",
        py: { xs: 3, md: 6 },
      }}
    >
      <Container maxWidth="md">
        {/* HEADER */}

        <Box
          sx={{
            background: "linear-gradient(135deg, #1565c0 0%, #4527a0 100%)",
            color: "#fff",
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            mb: 4,
            boxShadow: "0 10px 30px rgba(21,101,192,0.20)",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: "rgba(255,255,255,0.18)",
              p: 1.5,
              borderRadius: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ConfirmationNumberOutlinedIcon sx={{ fontSize: 38 }} />
          </Box>

          <Box>
            <Typography
              variant="h4"
              fontWeight={800}
              sx={{ fontSize: { xs: 24, md: 32 } }}
            >
              My Support Tickets
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "rgba(255,255,255,0.8)",
                mt: 0.5,
              }}
            >
              Search and track your support requests
            </Typography>
          </Box>
        </Box>

        {/* SEARCH SECTION */}

        <Paper
          elevation={0}
          sx={{
            p: { xs: 2.5, md: 4 },
            borderRadius: 4,
            border: "1px solid #e5eaf1",
            boxShadow: "0 5px 25px rgba(0,0,0,0.04)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 3,
            }}
          >
            <SearchIcon color="primary" sx={{ fontSize: 28 }} />

            <Typography variant="h6" fontWeight={700}>
              Find Your Ticket
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
            Enter your User ID below to retrieve your ticket information.
          </Typography>

          <Box component="form" onSubmit={viewTickets}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 2,
              }}
            >
              <TextField
                fullWidth
                label="User ID"
                placeholder="Enter your User ID"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
                disabled={loading}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <AssignmentOutlinedIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
                autoComplete="off"
              />

              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{
                  minWidth: { xs: "100%", sm: 160 },
                  borderRadius: 2,
                  fontWeight: 700,
                  textTransform: "none",
                  fontSize: 15,
                  boxShadow: "none",
                  py: 1.5,
                }}
              >
                {loading ? (
                  <CircularProgress size={22} color="inherit" />
                ) : (
                  <>
                    <SearchIcon sx={{ mr: 1 }} />
                    View Ticket
                  </>
                )}
              </Button>
            </Box>
          </Box>

          {/* ERROR MESSAGE */}

          {error && (
            <Alert
              severity="error"
              sx={{ mt: 3, borderRadius: 2 }}
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          )}
        </Paper>

        {/* TICKET DETAILS */}

        {ticket && (
          <Card
            elevation={0}
            sx={{
              mt: 4,
              borderRadius: 4,
              border: "1px solid #e5eaf1",
              boxShadow: "0 8px 30px rgba(0,0,0,0.05)",
              overflow: "hidden",
            }}
          >
            {/* TICKET HEADER */}

            <Box
              sx={{
                p: 3,
                backgroundColor: "#f8faff",
                borderBottom: "1px solid #e5eaf1",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                }}
              >
                <AssignmentOutlinedIcon color="primary" sx={{ fontSize: 30 }} />

                <Box>
                  <Typography variant="h6" fontWeight={800}>
                    Ticket Details
                  </Typography>

                  <Typography variant="caption" color="text.secondary">
                    Your support request information
                  </Typography>
                </Box>
              </Box>

              <Chip
                label="✓ Ticket Found"
                color="success"
                variant="outlined"
                sx={{ fontWeight: 600 }}
              />
            </Box>

            <CardContent
              sx={{
                p: { xs: 2.5, md: 4 },
              }}
            >
              {/* TITLE */}

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={700}
                  sx={{ letterSpacing: 1 }}
                >
                  TICKET TITLE
                </Typography>

                <Typography
                  variant="h5"
                  fontWeight={800}
                  sx={{
                    mt: 1,
                    color: "#263238",
                  }}
                >
                  {ticket.title}
                </Typography>
              </Box>

              <Divider sx={{ mb: 3 }} />

              {/* DESCRIPTION */}

              <Box sx={{ mb: 4 }}>
                <Typography
                  variant="subtitle2"
                  fontWeight={700}
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  Description
                </Typography>

                <Paper
                  elevation={0}
                  sx={{
                    p: 2.5,
                    backgroundColor: "#f8faff",
                    borderRadius: 2,
                    border: "1px solid #edf0f5",
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      color: "#455a64",
                      lineHeight: 1.8,
                    }}
                  >
                    {ticket.description}
                  </Typography>
                </Paper>
              </Box>

              {/* PRIORITY AND STATUS */}

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    sm: "1fr 1fr",
                  },
                  gap: 2.5,
                }}
              >
                {/* PRIORITY */}

                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    backgroundColor: "#fff8f5",
                    border: "1px solid #ffe3d9",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <PriorityHighIcon color="error" />

                    <Typography fontWeight={700}>Priority</Typography>
                  </Box>

                  <Chip
                    label={ticket.priority}
                    color={getPriorityColor(ticket.priority)}
                    sx={{
                      fontWeight: 700,
                      px: 1,
                    }}
                  />
                </Box>

                {/* STATUS */}

                <Box
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    backgroundColor: "#f5f8ff",
                    border: "1px solid #e0e9ff",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 2,
                    }}
                  >
                    <Typography
                      color="primary"
                      sx={{ fontSize: 22, fontWeight: 700 }}
                    >
                      ✓
                    </Typography>

                    <Typography fontWeight={700}>Status</Typography>
                  </Box>

                  <Chip
                    label={ticket.status}
                    color={getStatusColor(ticket.status)}
                    sx={{
                      fontWeight: 700,
                      px: 1,
                    }}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* FOOTER */}

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textAlign: "center",
            mt: 4,
          }}
        >
          Support Ticket Management System
        </Typography>
        <Button variant="contained" onClick={() => navigate("/home")}>
          {" "}
          Back
        </Button>
      </Container>
    </Box>
  );
}

export default ViewTicket;
