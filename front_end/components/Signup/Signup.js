import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideNavbar, showNavbar } from "./../../redux/reducers/visible";
import SignupView from "./SignupView";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isMounted, setMounted] = useState(false);
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    // set mounted to true
    setMounted(true);

    // hide navbar status in redux
    dispatch(hideNavbar());

    // cleanup
    return () => {
      setMounted(false);

      // show navbar status in redux
      dispatch(showNavbar());
    };
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    } else if (name === "password2") {
      setPassword2(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("email: " + email);
    console.log("password: " + password);
    console.log("password2: " + password2);
  };

  return (
    <SignupView
      email={email}
      password={password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
}

export default Signup;
