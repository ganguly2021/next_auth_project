import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { hideNavbar, showNavbar } from "./../../redux/reducers/visible";
import { signupSchema } from "./../../../validation/schema/auth";
import { getFormattedError, isEmptyObject } from "./../../../validation/helper";
import SignupView from "./SignupView";
import { useSnackbar } from "notistack";
import Head from "next/head";
import { useSession } from "next-auth/react";

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
  const [formError, setFormError] = useState({});
  const [isApiLoading, setApiLoading] = useState(false);
  const { data: session, status } = useSession();

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

  useEffect(() => {
    if (isApiLoading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  }, [isApiLoading]);

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

    // set loading state
    setApiLoading(true);

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
      setFormError(getFormattedError(error));

      // stop loading state
      setApiLoading(false);

      return;
    }
    // clean errors
    setFormError({});

    // send api call
    const data = await createUser(formData);

    if (!data.success) {
      if (data.errorType === "ValidationError") {
        setFormError(data.error);
      }

      // stop loading state
      setApiLoading(false);
    } else {
      // stop loading state
      setApiLoading(false);

      enqueueSnackbar(data.message, {
        variant: "success",
        autoHideDuration: 1500,
      });

      // reset form fields
      setEmail("");
      setUsername("");
      setPassword2("");
      setPassword("");

      // redirect to login page
      router.push("/login");
    }
  }

  // if user already authenticated
  // then redirect to dashboard
  if (status === "authenticated") {
    // redirect to dashboard
    router.push("/dashboard");
  }

  return (
    <>
      <Head>
        <title>NextJS | Register </title>
      </Head>
      <SignupView
        username={username}
        email={email}
        password={password}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={formError}
        isApiLoading={isApiLoading}
      />
    </>
  );
}

export default Signup;
