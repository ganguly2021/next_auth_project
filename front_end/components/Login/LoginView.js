import React from "react";
import TextFieldInput from "./../common/TextFieldInput";

function LoginView(props) {
  const { email, password, handleChange, handleSubmit, error } = props;

  return (
    <div className="container-fluid">
      <div className="container">
        <div className="card animate__animated animate__fadeInLeft w-50 p-5 mx-auto shadow rounded">
          <div className="card-body">
            <h5 className="card-title fw-bold mb-3">Already have an account ?</h5>
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
                By clicking Sign up, you agree to the terms of use.
              </small>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
