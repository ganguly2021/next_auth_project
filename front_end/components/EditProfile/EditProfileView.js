import React, { useState } from "react";
import classnames from "classnames";
import TextFieldInput from "../common/TextFieldInput";
import useWindowDimesion from "../../hooks/useWindowDimensions";
import ResponsiveLink from "../Layout/ResponsiveLink";

function EditProfileView(props) {
  const {
    password,
    password2,
    oldPassword,
    handleChange,
    handleSubmit,
    error,
  } = props;

  const [isImageHover, setImageHover] = useState(false);
  const { width } = useWindowDimesion();

  return (
    <div className="container-fluid">
      <div className="container my-5">
        <div
          className={classnames("card mx-auto shadow rounded", {
            "w-50 p-5": width >= 768,
            "p-2": !(width >= 768),
          })}
        >
          <div className="card-body">
            <form
              onSubmit={handleSubmit}
              className="text-center"
              autoComplete="off"
              noValidate
            >
              <img
                src="/images/donkey_user.jpg"
                className={classnames("mb-2 shadow img-thumbnail w-25 h-25", {
                  "bg-warning": isImageHover,
                  "p-1": isImageHover,
                  "rounded-circle": !isImageHover,
                })}
                onMouseOver={() => setImageHover(true)}
                onMouseOut={() => setImageHover(false)}
              />

              <TextFieldInput
                type="password"
                id="oldPassword"
                name="oldPassword"
                placeholder="******"
                lblText="Current Password"
                onChange={handleChange}
                value={oldPassword}
                error={error.oldPassword}
              />

              <TextFieldInput
                type="password"
                id="password"
                name="password"
                placeholder="******"
                lblText="New Password"
                onChange={handleChange}
                value={password}
                error={error.password}
              />
              <TextFieldInput
                type="password"
                id="password2"
                name="password2"
                placeholder="******"
                lblText="Re-type new password"
                infoText="Re-type new password must match the above password."
                onChange={handleChange}
                value={password2}
                error={error.password2}
              />

              <button
                className="w-100 mb-2 btn btn-lg rounded-4 btn-outline-primary"
                type="submit"
              >
                Update
              </button>
            </form>
            {width <= 768 && <ResponsiveLink />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileView;
