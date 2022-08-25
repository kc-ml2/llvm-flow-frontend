/* eslint-disable camelcase */
/* eslint-disable multiline-ternary */
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { validateTokenAndObtainSession } from "@/api/http-auth";
import { setAuthData } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import styles from "./login.module.scss";

const { REACT_APP_GOOGLE_CLIENT_ID } = process.env;

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleUserInit = useCallback((response) => {
    if (response.ok) {
      dispatch(setAuthData(response.data));
      localStorage.setItem("user", JSON.stringify(response.data));
      navigate(-1);
    } else {
      console.log(response);
    }
  }, []);

  function parseJwt(token: string) {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  const onGoogleLoginSuccess = useCallback(
    (response) => {
      const jwt = response.credential;
      const parsedJwt = parseJwt(jwt);

      const idToken = jwt;
      const data = {
        email: parsedJwt.email,
        first_name: parsedJwt.given_name,
        last_name: parsedJwt.family_name,
      };

      validateTokenAndObtainSession({ data, idToken }).then(handleUserInit);
    },
    [handleUserInit]
  );

  return (
    <section className={styles.login}>
      <h2>Sign in with Google</h2>
      <br></br>
      <GoogleOAuthProvider clientId={`${REACT_APP_GOOGLE_CLIENT_ID}`}>
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            onGoogleLoginSuccess(credentialResponse);
          }}
          onError={() => {
            alert("🚧 Login Failed ‼️");
          }}
          useOneTap
        />
      </GoogleOAuthProvider>
    </section>
  );
};

export default Login as React.ComponentType;
