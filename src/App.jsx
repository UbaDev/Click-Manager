import { Fragment, useState } from "react";
import { Toast } from "./components";
import Router from "./Router";
import BaseStyles from "./styles/BaseStyles";
import NormalizeStyles from "./styles/NormalizeStyles";

function App() {
  return (
    <Fragment>
      <NormalizeStyles />
      <BaseStyles />
      <Toast />
      <Router />
    </Fragment>
  );
}

export default App;
