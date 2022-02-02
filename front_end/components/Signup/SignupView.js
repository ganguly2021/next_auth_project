import React from "react";

function SignupView() {
  return (
    <div className="container-fluid">
      <div className="container">
        <div className="card animate__animated animate__fadeInRight w-50 p-5 mx-auto shadow rounded">
          <div className="card-body">
            <h5 className="card-title fw-bold">Sign up for free</h5>
            <form className="">
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control rounded-4"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-4"
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button
                className="w-100 mb-2 btn btn-lg rounded-4 btn-primary"
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
