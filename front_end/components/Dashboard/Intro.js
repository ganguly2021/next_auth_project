import React from "react";

function Intro() {
  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div className="card w-50 mx-auto shadow p-2">
          <div className="card-body text-center">
            <h3 className="card-title">Welcome to your dashboard.</h3>
            <img
              src="/images/side_image.jpg"
              className="shadow w-75 rounded animate__animated animate__tada"
            />
            <p className="card-text mt-5 fw-bold">
              Thanks, for testing this amazing nextjs app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
