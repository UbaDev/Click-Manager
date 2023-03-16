import React from "react";
import styled from "styled-components";
import { Button, Form, Input } from "../components";
import { font } from "../styles/styles";
import "./Login.css";


import bgImg from "../assets/img2.jpeg";
import goo from "../assets/goo.avif";
import logo from "../assets/logito.jpeg";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import toast from "../utils/toast";
import { UserService } from "../services/UserService";

export const FormElement = styled(Form.Element)`
  padding: 25px 40px 35px;
`;

export const FormHeading = styled.div`
  padding-bottom: 15px;
  ${font.size(21)}
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-top: 30px;
`;

export const ActionButton = styled(Button)`
  margin-left: 10px;
`;

export const Center = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export const Card = styled.div``;

// export const Center = styled.div`
//   // display: inline-block;
//   // position: relative;
//   // width: 100%;
//   // background: #fff;
//   // max-width: 400px;
//   // vertical-align: middle;
//   // border-radius: 3px;
//   // box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
// `;

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <section className="container">
      <div className="register">
        <div className="col-1 iz">
          <h2 className="titulo">Click Manager</h2>
          <img className="logito" src={logo} alt="" />

          <form className="formulario">
            <input
              className="userInput"
              type="email"
              placeholder="username"
              required
            />
            <input
              className="userInput"
              type="password"
              placeholder="password"
              required
            />

            <Button type="submit" className="boton" isWorking={isLoading}>
              Iniciar sesión
            </Button>
          </form>

          <button
            isWorking={isLoading}
            onClick={() => {
              setIsLoading(true);

              const provider = new GoogleAuthProvider();
              const auth = getAuth();
              signInWithPopup(auth, provider)
                .then((result) => {
                  // setIsLoading(false);
                  (async () => {
                    try {
                      await UserService.getInstance().updateUser();
                    } catch (error) {
                      toast.error(error.message);
                    }
                  })();
                })
                .catch((error) => {
                  setIsLoading(false);
                  // Handle Errors here.
                  const errorCode = error.code;
                  const errorMessage = error.message;

                  switch (errorCode) {
                    case "auth/account-exists-with-different-credential":
                      toast.error(
                        "You have already signed up with a different auth provider for that email."
                      );
                      break;
                    case "auth/auth-domain-config-required":
                      toast.error(
                        "Looks like you haven't configured your Firebase project's auth domain. Check the Firebase console to learn how to set it up."
                      );
                      break;
                    case "auth/cancelled-popup-request":
                      toast.error(
                        "The popup has been closed by the user before finalizing the sign-in process."
                      );
                      break;
                    case "auth/operation-not-allowed":
                      toast.error(
                        "You must enable the provider in the Firebase console before attempting to use it with the web."
                      );
                      break;
                    case "auth/operation-not-supported-in-this-environment":
                      toast.error(
                        "This operation is not supported in the environment your application is running on."
                      );
                      break;
                    case "auth/popup-blocked":
                      toast.error(
                        "The popup was blocked by the browser, either due to being in an iframe or due to being on the same domain as the popup."
                      );
                      break;
                    case "auth/popup-closed-by-user":
                      toast.error(
                        "The popup window was closed by the user before finalizing the sign-in process."
                      );
                      break;
                    case "auth/unauthorized-domain":
                      toast.error(
                        "The provided domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console."
                      );
                      break;

                    default:
                      toast.error(error.message);
                      break;
                  }
                });
            }}
          >
            <img className="google" src={goo} alt="my image" />
          </button>
        </div>
        <div className="col-2">
          <img src={bgImg} alt="" />
        </div>
      </div>
    </section>
  );
}
