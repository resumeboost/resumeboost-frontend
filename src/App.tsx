import "./App.css";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";

import Feedback from "./components/Feedback";
import Header from "./components/Header";
import Layout from "./components/Layout";
import LoggedInRoute from "./components/LoggedInRoute";
import LoggedOutRoute from "./components/LoggedOutRoute";
import Navbar from "./components/Navbar";
import UserContext from "./context/UserContext";
import User from "./interfaces/User";
import Dashboard from "./pages/Dashboard";
import LogIn from "./pages/LogIn";
import SignUp from "./pages/SignUp";
import { UserProfile } from "./pages/UserProfile";
import Landing from "./pages/Landing";
import api from "./utils/api";
import { ABTesting } from "./pages/ABTesting";

const App: React.FC = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    api.getLoggedInUser().then((currentUser) => setUser(currentUser));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        {/* Landing Page */}
        <Route
          exact
          path="/landing"
          render={() => (
            <LoggedOutRoute>
              <Landing />
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

        {/* A/B Testing */}
        <Route
          path="/abtesting"
          render={() => (
            <LoggedInRoute>
              <ABTesting />
            </LoggedInRoute>
          )}
        />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
