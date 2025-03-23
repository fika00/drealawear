import { useEffect, useState } from "react";
import InputField from "../../components/InputField/InputField";
import { api, version } from "../../components/utils/api";
import "./Login.scss";
import LoginForm from "../../components/LoginForm/LoginForm";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-container-inner">
        <LoginForm />
        <div className="login-container-inner-cover">
          <img
            className="login-container-inner-cover-img"
            src="/cataloguepics/lifestyle/lifestyle-white.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
