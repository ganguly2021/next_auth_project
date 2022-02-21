import React from "react";
import { useSession } from "next-auth/react";
import classnames from "classnames";
import useWindowDimesion from "../../hooks/useWindowDimensions";
import ResponsiveLink from "../Layout/ResponsiveLink";

function Intro() {
  const { data: session, status } = useSession();
  const { width } = useWindowDimesion();

  let username = "";

  if (status === "authenticated" && status !== "loading") {
    username = session.user.email.split("@")[0];
  }

  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div
          className={classnames("card mx-auto shadow p-2", {
            "w-50": width >= 768,
          })}
        >
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
            {width <= 768 && <ResponsiveLink />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
