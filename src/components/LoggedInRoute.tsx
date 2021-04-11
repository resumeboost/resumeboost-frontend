import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";

import UserContext from "../context/UserContext";
import Layout from "./Layout";

const LoggedInRoute: React.FC = ({ children }) => {
  const { user } = useContext(UserContext);

  return user ? <Layout>{children}</Layout> : <Redirect to="/landing" />;
};

export default LoggedInRoute;
