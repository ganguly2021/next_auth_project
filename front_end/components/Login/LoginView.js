import React, { useState, useEffect } from "react";
import Link from "next/link";
import classnames from "classnames";
import TextFieldInput from "./../common/TextFieldInput";
import useWindowDimesion from "../../hooks/useWindowDimensions";

function LoginView(props) {
  const { email, password, handleChange, handleSubmit, error } = props;
  const { width } = useWindowDimesion();

  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div
          className={classnames(
            "card animate__animated animate__fadeInLeft mx-auto shadow rounded",
            {
              "w-50 p-5": width >= 768,
              "p-2": !(width >= 768),
            }
          )}
        >
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3">
              Already have an account ?
            </h5>
            <form onSubmit={handleSubmit} autoComplete="off" noValidate>
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
              <button
                className="w-100 mb-2 btn btn-lg rounded-4 btn-outline-primary"
                type="submit"
              >
                Login
              </button>
              <small className="text-muted">
                Don't have an account ?{" "}
                <Link href="/signup">
                  <a className="text-danger">Signup here.</a>
                </Link>
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
