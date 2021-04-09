import { useFormik } from "formik";
import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { Button, Input, Label } from "@windmill/react-ui";

import UserContext from "../context/UserContext";
import api from "../utils/api";
import image from "./LogInImage.png";

const LogIn: React.FC = () => {
  const { setUser } = useContext(UserContext);

  // Pass the useFormik() hook initial form values and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      const user = await api.login(values);
      setUser(user);
    },
  });

  return (
    <div className="h-screen w-screen flex justify-around content-center items-center">
      <div
        className="bg-white h-screen w-1/2 flex content-center"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
        }}
      >
        {/* <img className="block" alt="left" src="./SignUpImage.png" /> */}
      </div>
      <div className="w-1/2 h-screen flex content-center items-center px-24 bg-gray-100 ">
        <div className="w-full">
          <h1 className="text-5xl font-medium py-2" data-testid="title">
            Log In
          </h1>
          <p className="py-4">
            Do not have an account?{" "}
            <Link to="/signup">
              <span
                className="cursor-pointer text-blue-400 font-normal"
                data-testid="link"
              >
                Sign Up
              </span>
            </Link>
          </p>
          <form className="mt-4" onSubmit={formik.handleSubmit}>
            <Label className="mt-4" data-testid="email">
              <span className="mt-4">E-mail</span>
              <Input
                css=""
                className="mt-1"
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Label>

            <Label className="mt-4" data-testid="password">
              <span>Password</span>
              <Input
                css=""
                className="mt-1"
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </Label>

            <Button className="my-8 w-full" type="submit" data-testid="submit">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
