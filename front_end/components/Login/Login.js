import React, { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { hideNavbar, showNavbar } from "./../../redux/reducers/visible";
import { loginSchema } from "./../../../validation/schema/auth";
import { getFormattedError, isEmptyObject } from "./../../../validation/helper";
import { useSnackbar } from "notistack";
import Head from "next/head";
import { useSession } from "next-auth/react";

import LoginView from "./LoginView";

function Login() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    // set loading state
    setApiLoading(true);

    // create form data object
    const formData = {
      email: email,
      password: password,
    };

    // validate form data
    const { error, value } = loginSchema.validate(formData, {
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

    // signin user using Next-Auth
    const result = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    // if NextAuth providers has error
    if (result.error !== null) {
      const temp = JSON.parse(result.error);
      const err = temp.error;

      // set error
      setFormError({ ...err });

      // stop loading state
      setApiLoading(false);

      return;
    }

    // clean errors
    setFormError({});

    // stop loading state
    setApiLoading(false);

    // show login success message
    enqueueSnackbar("User loggedin.", {
      variant: "success",
      autoHideDuration: 1500,
    });

    // redirect to dashboard
    router.push("/dashboard");
  }

  // if user already authenticated
  // then redirect to dashboard
  if (status === "authenticated" && status !== "loading") {
    // redirect to dashboard
    router.push("/dashboard");
  }

  return (
    <>
      <Head>
        <title>NextJS | Login </title>
      </Head>
      <LoginView
        email={email}
        password={password}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        error={formError}
      />
    </>
  );
}

export default Login;
