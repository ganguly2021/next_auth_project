import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { hideNavbar, showNavbar } from "./../../redux/reducers/visible";
import { signupSchema } from "./../../../validation/schema/auth";
import { getFormattedError, isEmptyObject } from "./../../../validation/helper";
import SignupView from "./SignupView";
import { useSnackbar } from "notistack";

// create new user api call
async function createUser(formData) {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // change response into json
  const data = await response.json();

  return data;
}

function Signup() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isMounted, setMounted] = useState(false);
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  const router = useRouter();

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
    } else if (name === "username") {
      setUsername(value);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // create form data object
    const formData = {
      username: username,
      email: email,
      password: password,
      password2: password2,
    };

    // validate form data
    const { error, value } = signupSchema.validate(formData, {
      abortEarly: false,
    });

    if (!isEmptyObject(error)) {
      // set errors
      setError(getFormattedError(error));
      return;
    }
    // clean errors
    setError({});

    // send api call
    const data = await createUser(formData);

    if (!data.success) {
      if (data.errorType === "ValidationError") {
        setError(data.error);
      }
    } else {
      enqueueSnackbar(data.message, { variant: "success", autoHideDuration: 15000 });

      // reset form fields
      setEmail("");
      setUsername("");
      setPassword2("");
      setPassword("");

      // redirect to login page
      router.push("/login");
    }
  }

  return (
    <SignupView
      username={username}
      email={email}
      password={password}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      error={error}
    />
  );
}

export default Signup;
