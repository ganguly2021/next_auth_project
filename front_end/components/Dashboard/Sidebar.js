import React, { useState, useEffect } from "react";
import Link from "next/link";
import classnames from "classnames";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { stopSidebarAnimate } from "./../../redux/reducers/visible";

function Sidebar() {
  const [hoverLink, setHoverLink] = useState(0);

  const visible = useSelector((state) => state.visible);
  const dispatch = useDispatch();

  useEffect(() => {
    // cleanup
    return () => {
      // disable dashboard animate
      dispatch(stopSidebarAnimate());
    };
  }, []);

  // handle user signout
  const handleSignout = () => {
    console.log("Signout user.");
  };

  return (
    <div
      className={classnames(
        "d-flex flex-column flex-shrink-0 p-3 text-white bg-dark shadow",
        {
          animate__animated: visible.animateSidebar,
          animate__fadeInLeft: visible.animateSidebar,
        }
      )}
      style={{ width: "280px", height: "100vh" }}
    >
      <Link href="/dashboard">
        <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <i className="fas fa-user-shield fa-2x text-warning"></i>
          <span className="fs-4 ms-3">Sandeep</span>
        </a>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link href="/">
            <a
              className={classnames("nav-link text-white", {
                active: hoverLink === 1,
                "fw-bold": hoverLink === 1,
              })}
              onMouseOut={() => setHoverLink(0)}
              onMouseOver={() => setHoverLink(1)}
            >
              <i className="fas fa-home fa-1x"></i>
              <span className="fs-6 ms-3">Home</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/profile/edit">
            <a
              className={classnames("nav-link text-white", {
                active: hoverLink === 2,
                "fw-bold": hoverLink === 2,
              })}
              onMouseOut={() => setHoverLink(0)}
              onMouseOver={() => setHoverLink(2)}
            >
              <i className="fas fa-user-edit fa-1x"></i>
              <span className="fs-6 ms-3">Edit Profile</span>
            </a>
          </Link>
        </li>
        <li>
          <button
            className={classnames("btn text-start w-100 nav-link text-white", {
              active: hoverLink === 3,
              "fw-bold": hoverLink === 3,
            })}
            onMouseOut={() => setHoverLink(0)}
            onMouseOver={() => setHoverLink(3)}
            onClick={handleSignout}
          >
            <i className="fas fa-sign-out-alt fa-1x"></i>
            <span className="fs-6 ms-3">Sign out</span>
          </button>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a
          href="#"
          className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="user_dropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="/images/donkey_user.jpg"
            alt=""
            className="rounded-circle me-2"
            width={32}
            height={32}
          />
          <strong>Donkey</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <a className="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
