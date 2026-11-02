import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

function CreateTicket() {
  const [tickets, setTickets] = useState({
    title: "",
    description: "",
    priority: "",
    userId: "",
  });

  const [loading, setLoading] = useState(false);

  // Snackbar states
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("success");

  const handleChange = (e) => {
    setTickets({
      ...tickets,
      [e.target.name]: e.target.value,
    });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  const ticket = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const request = await axios.post(
        "https://mytkt.runasp.net/api/User/CreateTicket",
        {
          ticketId: 0,
          title: tickets.title,
          description: tickets.description,
          priority: tickets.priority,
          status: "open",
          createdAt: new Date().toISOString(),
          userId: tickets.userId,
        },
      );

      console.log(request.data);

      setMessage("Ticket Created Successfully!");
      setSeverity("success");
      setOpen(true);

      setTickets({
        title: "",
        description: "",
        priority: "",
        userId: "",
      });
    } catch (err) {
      console.log(err);

      setMessage(err.response?.data?.message || "Ticket Creation Failed!");
      setSeverity("error");
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            mb: 3,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            gutterBottom
          >
            Create New Ticket
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Submit your issue and our team will help you.
          </Typography>
        </Box>

        <Box component="form" onSubmit={ticket}>
          <TextField
            fullWidth
            label="User ID"
            name="userId"
            value={tickets.userId}
            onChange={handleChange}
            margin="normal"
            required
            autoComplete="off"
          />

          <TextField
            fullWidth
            label="Ticket Title"
            name="title"
            value={tickets.title}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            label="Description"
            name="description"
            value={tickets.description}
            onChange={handleChange}
            margin="normal"
            multiline
            rows={4}
            required
          />

          <TextField
            fullWidth
            select
            label="Priority"
            name="priority"
            value={tickets.priority}
            onChange={handleChange}
            margin="normal"
            required
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>

          <Button
            fullWidth
            type="submit"
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            {loading ? "Submitting..." : "Submit Ticket"}
          </Button>
        </Box>
      </Paper>

      {/* Material UI Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default CreateTicket;
