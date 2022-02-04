import React, { useState, useEffect } from "react";
import Link from "next/link";
import classnames from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { stopSidebarAnimate } from "./../../redux/reducers/visible";
import { useSession, signOut } from "next-auth/react";
import { useSnackbar } from "notistack";

function Sidebar() {
  const [hoverLink, setHoverLink] = useState(0);
  const { data: session, status } = useSession();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
    // show notistack message
    enqueueSnackbar("User logged out.", {
      variant: "success",
      autoHideDuration: 1500,
    });

    // sign out user using nextjs-auth
    signOut();
  };

  let username = "";

  if (status === "authenticated" && status !== "loading") {
    username = session.user.email.split("@")[0];
  }

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
          <img
            src="/images/donkey_user.jpg"
            alt=""
            className="rounded-circle me-2"
            width={50}
            height={50}
          />
          <span className="fs-4 ms-3 text-capitalize">{username}</span>
        </a>
      </Link>
      <hr />
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link href="/dashboard">
            <a
              className={classnames("nav-link text-white", {
                active: hoverLink === 1,
                "fw-bold": hoverLink === 1,
              })}
              onMouseOut={() => setHoverLink(0)}
              onMouseOver={() => setHoverLink(1)}
            >
              <i className="fas fa-home fa-1x"></i>
              <span className="fs-6 ms-3">Intro</span>
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/">
            <a
              className={classnames("nav-link text-white", {
                active: hoverLink === 2,
                "fw-bold": hoverLink === 2,
              })}
              onMouseOut={() => setHoverLink(0)}
              onMouseOver={() => setHoverLink(2)}
            >
              <i className="fas fa-home fa-1x"></i>
              <span className="fs-6 ms-3">Home</span>
            </a>
          </Link>
        </li>
        <li>
          <Link href="/edit">
            <a
              className={classnames("nav-link text-white", {
                active: hoverLink === 3,
                "fw-bold": hoverLink === 3,
              })}
              onMouseOut={() => setHoverLink(0)}
              onMouseOver={() => setHoverLink(3)}
            >
              <i className="fas fa-user-edit fa-1x"></i>
              <span className="fs-6 ms-3">Edit Profile</span>
            </a>
          </Link>
        </li>
        <li>
          <button
            className={classnames("btn text-start w-100 nav-link text-white", {
              active: hoverLink === 4,
              "fw-bold": hoverLink === 4,
            })}
            onMouseOut={() => setHoverLink(0)}
            onMouseOver={() => setHoverLink(4)}
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
          <strong className="text-capitalize">{username}</strong>
        </a>
        <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
          <li>
            <hr className="dropdown-divider" />
          </li>
          <li>
            <button className="dropdown-item" onClick={handleSignout}>
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
