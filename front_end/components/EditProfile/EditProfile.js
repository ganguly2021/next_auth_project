import React, { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import EditProfileView from "./EditProfileView";
import { editProfileSchema } from "./../../../validation/schema/auth";
import { getFormattedError, isEmptyObject } from "./../../../validation/helper";

// update user password api call
async function updatePassword(formData) {
  const response = await fetch("/api/user/change-password", {
    method: "PATCH",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // change response into json
  const data = await response.json();

  return data;
}

function EditProfile() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
  const handleSubmit = async (e) => {
    e.preventDefault();

    // set loading state
    setApiLoading(true);

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

    // send api call
    const data = await updatePassword(formData);

    if (!data.success) {
      if (data.errorType === "ValidationError") {
        setFormError(data.error);
      }

      // stop loading state
      setApiLoading(false);

      //show error message
      enqueueSnackbar(data.message, {
        variant: "error",
        autoHideDuration: 1500,
      });
    } else {
      // stop loading state
      setApiLoading(false);

      enqueueSnackbar(data.message, {
        variant: "success",
        autoHideDuration: 1500,
      });

      // reset form fields
      setOldPassword("");
      setPassword2("");
      setPassword("");
    }
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
