import React from "react";
import ReactDOM from "react-dom";
import FontStyles from "./styles/fontStyles";
import App from "./App";
import "./firebase";

// TODO: Add scrict mode
ReactDOM.render(
  <>
    <FontStyles />
    <App />
  </>,
  document.getElementById("root")
);
