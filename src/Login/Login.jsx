import React, { useState } from "react";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

function Login({ onLogin }) {
  const [user, setuser] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  //#region onChange
  const handleChange = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };
  //#endregion

  //#region Login
  const newUser = async (e) => {
    e.preventDefault();

    if (!user.username.trim() || !user.password.trim()) {
      toast.warning("Enter username and password");
      return;
    }

    try {
      const response = await fetch("https://mytkt.runasp.net/api/User/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const result = await response.json();

      if (response.ok && result.token) {
        onLogin(result.token, result.userDetails);
        localStorage.setItem("token", result.token);
        toast.success("Login Successful!");
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
        console.log(result.message);
        console.log(result.userDetails);
        navigate("/home");

        setuser({ username: "", password: "" });
      } else {
        toast.error(result.message || "Invalid username and password");
        setuser({ username: "", password: "" });
      }
    } catch (err) {
      console.error(err);
      toast.error("Login failed. Please try again.");
      setuser({ username: "", password: "" });
    }
  };
  //#endregion

  return (
    <>
      <Toaster position="top-right" richColors />
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #e3f2fd, #ede7f6)",
          p: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 4,
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ textAlign: "center" }}
            color="primary"
            gutterBottom
          >
            User Login
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textAlign: "center" }}
          >
            Enter your details
          </Typography>

          <Box component="form" onSubmit={newUser}>
            <TextField
              fullWidth
              label="Name"
              name="username"
              value={user.username}
              onChange={handleChange}
              margin="normal"
              autoComplete="off"
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
              margin="normal"
              autoComplete="off"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: "none",
                fontSize: 16,
                fontWeight: "bold",
              }}
            >
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default Login;
