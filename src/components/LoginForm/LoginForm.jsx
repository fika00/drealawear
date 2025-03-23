import InputField from "../InputField/InputField";
import "./LoginForm.scss";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useToast } from "../../components/utils/ToastContext";
import { useState } from "react";
import { api, version } from "../utils/api";
import useCart from "../utils/useCart";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { getUserCart } = useCart();

  const onSignIn = (data) => {
    if (
      signIn({
        auth: {
          token: data?.jwtToken,
          type: "Bearer",
        },
        // refresh: data?.refreshToken,
        userState: {
          userId: data?.userId,
        },
      })
    ) {
      addToast("Successfully signed in.", "success");
      navigate("/");
    } else {
      console.error("Error saving cookies.");
    }
  };

  const {
    mutate: login,
    data, // response data if successful
    isPending, // loading state
    error, // error state
  } = useMutation({
    mutationFn: async () => {
      const response = await fetch(`${api}/v${version}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      return response.json();
    },
    onSuccess: (data) => {
      onSignIn(data);
      getUserCart();
    },
    onError: (error) => {
      console.error("Login failed:", error);
      addToast("Login failed.", "error");
      // Additional error handling if needed
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    login(); // Trigger the mutation
  };

  return (
    <form onSubmit={handleSubmit} className="login-container-inner-form">
      <h2 className="login-container-inner-form-header playfair">Login</h2>
      <InputField
        onChange={setEmail}
        text={email}
        inputData={{
          type: "email",
          id: "email",
          name: "email",
          required: true,
        }}
      />
      <InputField
        onChange={setPassword}
        text={password}
        inputData={{
          type: "password",
          id: "password",
          name: "password",
          required: true,
        }}
      />
      <button type="submit" className="login-container-inner-form-button">
        {isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
