import React from "react";
import TextFieldInput from "../common/TextFieldInput";

function SignupView(props) {
  const { username, email, password, password2, handleChange, handleSubmit, error } =
    props;
  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div className="card animate__animated animate__fadeInRight w-50 p-5 mx-auto shadow rounded">
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
                By clicking Sign up, you agree to the terms of use.
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupView;
