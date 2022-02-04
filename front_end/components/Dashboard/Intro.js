import React from "react";
import { useSession, signOut } from "next-auth/react";

function Intro() {
  const { data: session, status } = useSession();

  let username = "";

  if (status === "authenticated" && status !== "loading") {
    username = session.user.email.split("@")[0];
  }

  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div className="card w-50 mx-auto shadow p-2 animate__animated animate__fadeInRight">
          <div className="card-body text-center">
            <h3 className="card-title">
              Welcome {<span className="text-capitalize">{username}</span>}, to
              your dashboard.
            </h3>
            <img
              src="/images/dash_image.jpg"
              className="shadow rounded img-fluid img-thumbnail"
            />
            <p className="card-text mt-5 fw-bold">
              Thanks, {<span className="text-capitalize">{username}</span>} for
              testing this amazing nextjs app.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
