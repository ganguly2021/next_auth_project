import React, { useState, useEffect } from "react";
import Link from "next/link";
import className from "classnames";
import { useSelector } from "react-redux";
import { useSession } from "next-auth/react";

function Footer() {
  const [hoverLink, setHoverLink] = useState(0);
  const { data: session, status } = useSession();

  const visible = useSelector((state) => state.visible);

  useEffect(() => {
    // cleanup
    return () => {
      setHoverLink(0);
    };
  }, []);

  let navLinks = null;

  if (status !== "authenticated") {
    navLinks = (
      <>
        <li className="nav-item">
          <Link href="/">
            <a
              className={className("nav-link px-2", {
                "text-danger": hoverLink === 1,
                "fw-bold": hoverLink === 1,
                "text-muted": hoverLink !== 1,
              })}
              onMouseOver={() => setHoverLink(1)}
              onMouseOut={() => setHoverLink(0)}
            >
              Home
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/login">
            <a
              className={className("nav-link px-2", {
                "text-danger": hoverLink === 2,
                "fw-bold": hoverLink === 2,
                "text-muted": hoverLink !== 2,
              })}
              onMouseOver={() => setHoverLink(2)}
              onMouseOut={() => setHoverLink(0)}
            >
              Login
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/signup">
            <a
              className={className("nav-link px-2", {
                "text-danger": hoverLink === 3,
                "fw-bold": hoverLink === 3,
                "text-muted": hoverLink !== 3,
              })}
              onMouseOver={() => setHoverLink(3)}
              onMouseOut={() => setHoverLink(0)}
            >
              Signup
            </a>
          </Link>
        </li>
      </>
    );
  } else {
    navLinks = (
      <>
        <li className="nav-item">
          <Link href="/">
            <a
              className={className("nav-link px-2", {
                "text-danger": hoverLink === 1,
                "fw-bold": hoverLink === 1,
                "text-muted": hoverLink !== 1,
              })}
              onMouseOver={() => setHoverLink(1)}
              onMouseOut={() => setHoverLink(0)}
            >
              Home
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/dashboard">
            <a
              className={className("nav-link px-2", {
                "text-danger": hoverLink === 2,
                "fw-bold": hoverLink === 2,
                "text-muted": hoverLink !== 2,
              })}
              onMouseOver={() => setHoverLink(2)}
              onMouseOut={() => setHoverLink(0)}
            >
              Dashboard
            </a>
          </Link>
        </li>
      </>
    );
  }

  return (
    <footer
      className="py-5 animate__animated animate__fadeInUp"
      hidden={visible.isFooterHidden}
    >
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">{navLinks}</ul>
      <p className="text-center text-danger fw-bold">
        &copy; {new Date().getFullYear()} NextJS, Inc
      </p>
    </footer>
  );
}

export default Footer;
