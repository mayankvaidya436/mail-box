import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const LoginForm = () => {
  const [authMode, setAuthMode] = useState("signup");

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  return (
    <div className="container w-50 d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-6">
        {authMode === "signin" ? (
          <SignInForm onSwitchMode={changeAuthMode} />
        ) : (
          <SignUpForm onSwitchMode={changeAuthMode} />
        )}
      </div>
    </div>
  );
};

export default LoginForm;