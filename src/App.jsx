import React, { lazy, Suspense, useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Loading from "./Loading/Loading";
import { Toaster } from "sonner";

const Home = lazy(() => import("./Home/Home"));
const Contact = lazy(() => import("./Contact/Contact"));
const Login = lazy(() => import("./Login/Login"));
const NotFound = lazy(() => import("./NotFound/NotFound"));
const Profile = lazy(() => import("./Profile/Profile"));
const CreateTicket = lazy(() => import("./CreateTicket/CreateTicket"));
const ViewTicket = lazy(() => import("./CreateTicket/ViewTicket"));
const TrackTicket = lazy(() => import("./CreateTicket/TrackTicket"));

function App() {
  // Get token from localStorage
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token");
  });

  // Get user details from localStorage after refresh
  const [userDetails, setUserDetails] = useState(() => {
    try {
      const savedUser = localStorage.getItem("userDetails");

      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("User details loading error:", error);
      return null;
    }
  });

  // Login success
  const handleLogin = (newToken, newUserDetails) => {
    localStorage.setItem("token", newToken);

    localStorage.setItem("userDetails", JSON.stringify(newUserDetails));

    setToken(newToken);
    setUserDetails(newUserDetails);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");

    setToken(null);
    setUserDetails(null);
  };

  return (
    <>
      <Toaster position="top-right" richColors />

      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Root route */}
            <Route
              path="/"
              element={
                token ? (
                  <>
                    <Navbar onLogout={handleLogout} />
                    <Home onLogout={handleLogout} />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Login route */}
            <Route
              path="/login"
              element={
                token ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />

            {/* Home route */}
            <Route
              path="/home"
              element={
                token ? (
                  <>
                    <Navbar onLogout={handleLogout} />
                    <Home onLogout={handleLogout} />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Contact route */}
            <Route
              path="/contact"
              element={
                token ? (
                  <>
                    <Navbar onLogout={handleLogout} />
                    <Contact />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Profile route */}
            <Route
              path="/profile"
              element={
                token ? (
                  <>
                    <Navbar onLogout={handleLogout} />
                    <Profile userDetails={userDetails} />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Create Ticket */}
            <Route
              path="/create-ticket"
              element={
                token ? (
                  <>
                    <Navbar onLogout={handleLogout} />
                    <CreateTicket />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* View Ticket */}
            <Route
              path="/view-ticket"
              element={
                token ? (
                  <>
                    <Navbar onLogout={handleLogout} />
                    <ViewTicket />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Track Ticket */}
            <Route
              path="/track-ticket"
              element={
                token ? (
                  <>
                    <Navbar onLogout={handleLogout} />
                    <TrackTicket />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />

            {/* Not Found */}
            <Route
              path="*"
              element={
                token ? (
                  <>
                    <Navbar onLogout={handleLogout} />
                    <NotFound />
                  </>
                ) : (
                  <Navigate to="/login" replace />
                )
              }
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
