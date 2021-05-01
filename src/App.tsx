import "./App.css";

import React, { useEffect, useRef, useState } from "react";
import { Redirect, Route, BrowserRouter as Router } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Feedback from "./components/Feedback";
import Header from "./components/Header";
import Layout from "./components/Layout";
import LogIn from "./pages/LogIn";
import LoggedInRoute from "./components/LoggedInRoute";
import LoggedOutRoute from "./components/LoggedOutRoute";
import Navbar from "./components/Navbar";
import { Review } from "./interfaces/Review";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import User from "./interfaces/User";
import UserContext from "./context/UserContext";
import { UserProfile } from "./pages/UserProfile";
import api from "./utils/api";

const App: React.FC = () => {
  const [user, setUser] = useState<User>();
  const [reviews, setReviews] = useState<Review[]>();
  // const [resumeFile, setResumeFile] = useState<string>();

  useEffect(() => {
    api
      .getLoggedInUser()
      .then((currentUser) => setUser(currentUser))
      .catch((err) => console.log("User not logged in"));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, reviews, setReviews }}>
      <Toaster />

      <Router>
        {/* Landing Page */}
        <Route
          exact
          path="/"
          render={() => (
            <LoggedOutRoute>
              <Redirect to="/dashboard" />
            </LoggedOutRoute>
          )}
        />

        {/* Login Page */}
        <Route
          path="/login"
          render={() => (
            <LoggedOutRoute>
              <LogIn />
            </LoggedOutRoute>
          )}
        />

        {/* Sign Up Page */}
        <Route
          path="/signup"
          render={() => (
            <LoggedOutRoute>
              <SignUp />
            </LoggedOutRoute>
          )}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          render={() => (
            <LoggedInRoute>
              <Dashboard />
            </LoggedInRoute>
          )}
        />

        {/* Feedback */}
        <Route
          path="/review"
          render={() => (
            <LoggedInRoute>
              <Feedback />
            </LoggedInRoute>
          )}
        />

        {/* User Profile */}
        <Route
          path="/profile"
          render={() => (
            <LoggedInRoute>
              <UserProfile />
            </LoggedInRoute>
          )}
        />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
