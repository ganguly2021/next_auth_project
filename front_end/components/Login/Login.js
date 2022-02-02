import React, { useEffect, useState } from "react";
import LoginView from "./LoginView";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isMounted, setMounted] = useState(false);
  const [error, setError] = useState({})

  useEffect(() => {
    // set mounted to true
    setMounted(true);

    // cleanup
    return () => {
      setMounted(false);
    };
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("email: " + email);
    console.log("password: " + password);
  };

  return (
    <LoginView
      email={email}
      password={password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
}

export default Login;
