import React from "react";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Divider,
  Stack,
  Paper,
  Button,
} from "@mui/material";

import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";

import { useNavigate } from "react-router-dom";

function Profile({ userDetails }) {
  const navigate = useNavigate();

  // Get saved user details from localStorage
  const getSavedUserDetails = () => {
    try {
      const savedUser = localStorage.getItem("userDetails");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Error reading user details:", error);
      return null;
    }
  };

  // Use props first; otherwise use localStorage
  const profileDetails = userDetails || getSavedUserDetails();

  if (!profileDetails) {
    return (
      <Box
        sx={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#f5f7fb",
          p: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 4,
          }}
        >
          <AccountCircleIcon
            sx={{
              fontSize: 55,
              color: "text.secondary",
              mb: 1,
            }}
          />

          <Typography variant="h6" fontWeight={700}>
            Profile Not Found
          </Typography>

          <Typography color="text.secondary">
            Please log in to view your profile details.
          </Typography>

          <Button
            variant="contained"
            onClick={() => navigate("/home")}
            sx={{ mt: 3, textTransform: "none" }}
          >
            Back to Home
          </Button>
        </Paper>
      </Box>
    );
  }

  const isAdmin = String(profileDetails.role || "").toLowerCase() === "admin";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
        py: { xs: 4, md: 8 },
        px: 2,
      }}
    >
      <Box sx={{ maxWidth: 700, mx: "auto" }}>
        <Typography
          variant="h4"
          fontWeight={800}
          color="#172554"
          sx={{ mb: 1 }}
        >
          My Profile
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 4 }}>
          View your personal account information.
        </Typography>

        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            border: "1px solid #e5eaf3",
            boxShadow: "0 12px 35px rgba(15, 23, 42, 0.07)",
          }}
        >
          <Box
            sx={{
              height: 150,
              background:
                "linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #60a5fa 100%)",
            }}
          />

          <CardContent
            sx={{
              px: { xs: 2.5, md: 4 },
              pb: 4,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              alignItems={{ xs: "center", sm: "flex-end" }}
              justifyContent="space-between"
              spacing={2}
              sx={{ mt: -8, mb: 3 }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  p: 2.5,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #eff6ff, #f5f3ff)",
                  border: "1px solid #dbeafe",
                  width: { xs: "100%", sm: "auto" },
                  minWidth: 0,
                }}
              >
                <Avatar
                  sx={{
                    width: 58,
                    height: 58,
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    fontSize: 25,
                    fontWeight: 800,
                    flexShrink: 0,
                  }}
                >
                  {profileDetails.userName?.charAt(0)?.toUpperCase() || (
                    <PersonRoundedIcon />
                  )}
                </Avatar>

                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="h5"
                    fontWeight={800}
                    sx={{
                      color: "#172554",
                      overflowWrap: "anywhere",
                    }}
                  >
                    {profileDetails.userName || "User"}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "#64748b", mt: 0.3, mb: 1 }}
                  >
                    Account Profile
                  </Typography>

                  <Chip
                    label="Active Account"
                    size="small"
                    sx={{
                      height: 23,
                      fontSize: "11px",
                      fontWeight: 700,
                      color: "#15803d",
                      backgroundColor: "#dcfce7",
                      borderRadius: 1.5,
                    }}
                  />
                </Box>
              </Box>

              <Chip
                icon={<VerifiedUserOutlinedIcon />}
                label={profileDetails.role || "User"}
                color={isAdmin ? "secondary" : "primary"}
                sx={{ fontWeight: 700 }}
              />
            </Stack>

            <Divider sx={{ mb: 3 }} />

            <Typography
              variant="subtitle1"
              fontWeight={800}
              sx={{ mb: 2, color: "#172554" }}
            >
              Account Information
            </Typography>

            <Stack spacing={2}>
              {/* User ID */}
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "#fafcff",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    variant="rounded"
                    sx={{ bgcolor: "#dbeafe", color: "#1d4ed8" }}
                  >
                    <BadgeOutlinedIcon />
                  </Avatar>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary">
                      User ID
                    </Typography>

                    <Typography
                      variant="body2"
                      fontWeight={600}
                      sx={{ overflowWrap: "anywhere" }}
                    >
                      {profileDetails.userId || "Not available"}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              {/* Email */}
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "#fafcff",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    variant="rounded"
                    sx={{ bgcolor: "#dcfce7", color: "#15803d" }}
                  >
                    <EmailOutlinedIcon />
                  </Avatar>

                  <Box sx={{ minWidth: 0 }}>
                    <Typography variant="caption" color="text.secondary">
                      Email Address
                    </Typography>

                    <Typography
                      variant="body1"
                      fontWeight={600}
                      sx={{ overflowWrap: "anywhere" }}
                    >
                      {profileDetails.email || "Not available"}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>

              {/* Role */}
              <Paper
                variant="outlined"
                sx={{
                  p: 2,
                  borderRadius: 3,
                  bgcolor: "#fafcff",
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar
                    variant="rounded"
                    sx={{ bgcolor: "#f3e8ff", color: "#7e22ce" }}
                  >
                    <AccountCircleIcon />
                  </Avatar>

                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Account Role
                    </Typography>

                    <Typography variant="body1" fontWeight={600}>
                      {profileDetails.role || "Not available"}
                    </Typography>
                  </Box>
                </Stack>
              </Paper>
            </Stack>

            {/* Back Button */}
            <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
              <Button
                variant="contained"
                onClick={() => navigate("/home")}
                sx={{
                  mt: 3,
                  px: 4,
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                Back
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Profile;
