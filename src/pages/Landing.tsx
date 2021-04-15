import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Button, Input, Label } from "@windmill/react-ui";

import UserContext from "../context/UserContext";
import api from "../utils/api";

const Landing: React.FC = () => {
  const { setUser } = useContext(UserContext);

  return (
    <div className="h-screen w-screen flex justify-around content-center items-center">
      <div className="w-screen h-1/2 content-center items-center px-30 bg-gray-50 ">
        <div className="w-full">
          <h1 className="text-5xl font-medium py-2">Landing</h1>
          <p className="py-4">
            <Link to="/login">
              <span className="cursor-pointer text-blue-400 font-normal">
                Sign In
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
