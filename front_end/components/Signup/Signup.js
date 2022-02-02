import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { hideNavbar, showNavbar } from "./../../redux/reducers/visible";
import SignupView from "./SignupView";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  return <SignupView />;
}

export default Signup;
