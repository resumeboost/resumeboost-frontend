import "./index.css";

import React from "react";
import ReactDOM from "react-dom";

import { Windmill } from "@windmill/react-ui";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import theme from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <Windmill theme={theme}>
      <App />
    </Windmill>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
