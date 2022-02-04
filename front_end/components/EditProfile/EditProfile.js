import React, { useState, useEffect } from "react";
import EditProfileView from "./EditProfileView";
import { editProfileSchema } from "./../../../validation/schema/auth";
import { getFormattedError, isEmptyObject } from "./../../../validation/helper";

function EditProfile() {
  const [isMounted, setMounted] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [formError, setFormError] = useState({});
  const [isApiLoading, setApiLoading] = useState(false);

  // componentDidMount
  useEffect(() => {
    // set component mounted true
    setMounted(true);

    // cleanup
    return () => {
      setMounted(false);
    };
  }, []);

  // handle loader
  useEffect(() => {
    if (isApiLoading) {
      document.body.classList.add("loading");
    } else {
      document.body.classList.remove("loading");
    }
  }, [isApiLoading]);

  // handle form input change
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "password") {
      setPassword(value);
    } else if (name === "password2") {
      setPassword2(value);
    } else if (name === "oldPassword") {
      setOldPassword(value);
    }
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // get form data object
    const formData = {
      password,
      password2,
      oldPassword,
    };

    // validate form data
    const { error, value } = editProfileSchema.validate(formData, {
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

    console.log(formData);
  };

  return (
    <EditProfileView
      password={password}
      password2={password2}
      oldPassword={oldPassword}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      error={formError}
    />
  );
}

export default EditProfile;
