import React, { useState, useEffect } from "react";
import classnames from "classnames";
import TextFieldInput from "../common/TextFieldInput";
import Link from "next/link";
import useWindowDimesion from "../../hooks/useWindowDimensions";

function SignupView(props) {
  const {
    username,
    email,
    password,
    password2,
    handleChange,
    handleSubmit,
    error,
  } = props;

  const { width } = useWindowDimesion();

  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div
          className={classnames(
            "card animate__animated animate__fadeInRight mx-auto shadow rounded",
            {
              "w-50 p-5": width >= 768,
              "p-2": !(width >= 768),
            }
          )}
        >
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3">Sign up for free</h5>
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
              <TextFieldInput
                type="text"
                id="username"
                name="username"
                placeholder="Sandeep Ganguly"
                lblText="Username"
                infoText="Username don't need to be unique."
                onChange={handleChange}
                value={username}
                error={error.username}
              />
              <TextFieldInput
                type="email"
                id="email"
                name="email"
                placeholder="abc@abc.com"
                lblText="Email address"
                infoText="We never share your email with anyone."
                onChange={handleChange}
                value={email}
                error={error.email}
              />
              <TextFieldInput
                type="password"
                id="password"
                name="password"
                placeholder="******"
                lblText="Password"
                onChange={handleChange}
                value={password}
                error={error.password}
              />
              <TextFieldInput
                type="password"
                id="password2"
                name="password2"
                placeholder="******"
                lblText="Re-type password"
                infoText="Re-type password must match the above password."
                onChange={handleChange}
                value={password2}
                error={error.password2}
              />

              <button
                className="w-100 mb-2 btn btn-lg rounded-4 btn-outline-primary"
                type="submit"
              >
                Sign up
              </button>
              <small className="text-muted">
                Already have an account ?{" "}
                <Link href="/login">
                  <a className="text-danger">Login here.</a>
                </Link>
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupView;
