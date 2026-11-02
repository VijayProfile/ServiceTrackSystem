import React, { useState } from "react";
import axios from "axios";

import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";

function Contact() {
  const [toEmail, settoEmail] = useState("");
  const [toSubject, settoSubject] = useState("");
  const [message, setmessage] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [loading, setLoading] = useState(false);

  //#region Email
  const sendmail = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        `https://mytkt.runasp.net/api/User/EmailSend?toEmail=${encodeURIComponent(toEmail)}`,
        {
          subject: toSubject,
          message: message,
        },
      );

      setSnackbar({
        open: true,
        message: response.data.message || "Email sent successfully!",
        severity: "success",
      });

      settoEmail("");
      settoSubject("");
      setmessage("");
    } catch (err) {
      console.error("Email error:", err.response?.data || err.message);

      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Email sending failed",
        severity: "error",
      });
      settoEmail("");
      settoSubject("");
      setmessage("");
    } finally {
      setLoading(false);
    }
  };
  //#endregion

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return;

    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Paper
        elevation={4}
        sx={{
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "primary.main",
            mb: 3,
          }}
        >
          Contact Us
        </Typography>

        <Box component="form" onSubmit={sendmail}>
          <TextField
            label="Email Address"
            type="email"
            fullWidth
            margin="normal"
            value={toEmail}
            onChange={(e) => settoEmail(e.target.value)}
            required
            autoComplete="off"
          />

          <TextField
            label="Subject"
            type="text"
            fullWidth
            margin="normal"
            value={toSubject}
            onChange={(e) => settoSubject(e.target.value)}
            required
            autoComplete="off"
          />

          <TextField
            label="Message"
            multiline
            rows={4}
            fullWidth
            margin="normal"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            required
            autoComplete="off"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={loading}
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: "bold",
            }}
          >
            {loading ? "Sending..." : "Send Email"}
          </Button>
        </Box>
      </Paper>

      {/* Snackbar Alert */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Contact;
