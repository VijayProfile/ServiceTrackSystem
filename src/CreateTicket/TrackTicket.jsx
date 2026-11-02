import React, { useState } from "react";
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
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function TrackTicket() {
  const [ticketId, setTicketId] = useState("");
  const [ticket, setTicket] = useState(null);
  const [open, setOpen] = useState(false);

  const navigates = useNavigate();
  const handleTrack = async (e) => {
    e.preventDefault();

    if (!ticketId.trim()) {
      setOpen(true);
      return;
    }

    try {
      const request = await axios.get(
        "https://mytkt.runasp.net/api/User/TrackTicket",
        {
          params: {
            ticketId: ticketId,
          },
        },
      );

      console.log("API Response:", request.data);

      const data = Array.isArray(request.data) ? request.data[0] : request.data;

      if (!data) {
        setTicket(null);
        setOpen(true);
        return;
      }

      setTicket({
        ...data,
        ticketId: data.ticketId || data.TicketId || ticketId,
      });

      setTicketId("");
    } catch (err) {
      console.log(err);
      setTicket(null);
      setTicketId("");
      setOpen(true);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: { xs: 2.5, sm: 4 },
          borderRadius: 4,
          maxWidth: 650,
          mx: "auto",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Box
            sx={{
              width: 75,
              height: 75,
              borderRadius: "50%",
              bgcolor: "#eaf2ff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 2,
            }}
          >
            <ConfirmationNumberIcon sx={{ fontSize: 40, color: "#1976d2" }} />
          </Box>

          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Track Your Ticket
          </Typography>

          <Typography color="text.secondary" variant="body2">
            Enter your Ticket ID to check the current status.
          </Typography>
        </Box>

        {/* Search Form */}
        <Box component="form" onSubmit={handleTrack}>
          <TextField
            fullWidth
            label="Ticket ID"
            placeholder="Enter your Ticket ID"
            value={ticketId}
            onChange={(e) => setTicketId(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            startIcon={<SearchIcon />}
            sx={{
              py: 1.5,
              borderRadius: 2,
              textTransform: "none",
              fontSize: 16,
              fontWeight: "bold",
              boxShadow: 2,
            }}
          >
            Track Ticket
          </Button>
        </Box>

        {/* Ticket Details */}
        {ticket && (
          <Card
            elevation={0}
            sx={{
              mt: 4,
              borderRadius: 3,
              border: "1px solid #e0e7ef",
              overflow: "hidden",
            }}
          >
            {/* Card Header */}
            <Box
              sx={{
                bgcolor: "#f1f6ff",
                px: 3,
                py: 2.5,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h6" fontWeight="bold" color="primary.dark">
                  Ticket Details
                </Typography>

                <Typography variant="caption" color="text.secondary">
                  Your ticket information
                </Typography>
              </Box>

              <ConfirmationNumberIcon
                sx={{ fontSize: 35, color: "primary.main" }}
              />
            </Box>

            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              {/* Ticket ID and Priority */}
              <Box
                display="grid"
                gridTemplateColumns={{ xs: "1fr", sm: "1fr 1fr" }}
                gap={2}
              >
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#f8fafc",
                    borderRadius: 2,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    TICKET ID
                  </Typography>

                  <Typography fontWeight="bold" mt={0.5}>
                    {ticket.ticketId || ticket.TicketId || ticketId}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    p: 2,
                    bgcolor: "#f8fafc",
                    borderRadius: 2,
                    border: "1px solid #e5e7eb",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    PRIORITY
                  </Typography>

                  <Box mt={0.5}>
                    <Chip
                      label={
                        ticket.priority || ticket.Priority || "Not Available"
                      }
                      color={
                        (ticket.priority || ticket.Priority) === "High"
                          ? "error"
                          : (ticket.priority || ticket.Priority) === "Medium"
                            ? "warning"
                            : "success"
                      }
                      size="small"
                      sx={{ fontWeight: "bold" }}
                    />
                  </Box>
                </Box>
              </Box>

              {/* Title */}
              <Box mt={3}>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  TICKET TITLE
                </Typography>

                <Typography variant="body1" fontWeight="600" mt={0.5}>
                  {ticket.title || ticket.Title}
                </Typography>
              </Box>

              <Divider sx={{ my: 2.5 }} />

              {/* Description */}
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight="bold"
                >
                  DESCRIPTION
                </Typography>

                <Typography variant="body1" mt={0.5}>
                  {ticket.description || ticket.Description}
                </Typography>
              </Box>

              {/* Status */}
              <Box
                mt={3}
                p={2.5}
                sx={{
                  borderRadius: 2,
                  bgcolor:
                    (ticket.status || ticket.Status) === "Resolved"
                      ? "#ecfdf3"
                      : "#fff8e6",
                  border: "1px solid",
                  borderColor:
                    (ticket.status || ticket.Status) === "Resolved"
                      ? "#a7f3d0"
                      : "#fde68a",
                }}
              >
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  flexWrap="wrap"
                  gap={1}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <ConfirmationNumberIcon
                      color={
                        (ticket.status || ticket.Status) === "Resolved"
                          ? "success"
                          : "warning"
                      }
                    />

                    <Box>
                      <Typography fontWeight="bold" variant="body2">
                        Current Status
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        Latest ticket progress
                      </Typography>
                    </Box>
                  </Box>

                  <Chip
                    label={ticket.status || ticket.Status || "Not Available"}
                    color={
                      (ticket.status || ticket.Status) === "Resolved"
                        ? "success"
                        : "warning"
                    }
                    sx={{ fontWeight: "bold" }}
                  />
                </Box>
              </Box>

              <Box display="flex" justifyContent="flex-end" mt={3}>
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={() => navigates("/home")}
                  sx={{
                    px: 4,
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                  }}
                >
                  Back
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
      </Paper>

      {/* Snackbar Alert */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          severity="warning"
          variant="filled"
          onClose={() => setOpen(false)}
          sx={{ width: "100%" }}
        >
          Please enter Ticket ID
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default TrackTicket;
