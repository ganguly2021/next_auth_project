import React, { useEffect, useState } from "react";
import Link from "next/link";
import classNames from "classnames";

function Navbar() {
  const [hoverLink, setHoverLink] = useState(0);
  const [hoverLogo, setHoverLogo] = useState(false);

  useEffect(() => {
    // cleanup
    return () => {
      setHoverLink(0);
      setHoverLogo(false);
    };
  }, []);

  return (
    <div className="container-fluid px-0 shadow-sm">
      <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4">
          <Link href="/">
            <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none">
              <img
                src="/images/logo.jpg"
                width={50}
                height={50}
                className={classNames("animate__animated", {
                  animate__heartBeat: hoverLogo,
                })}
                onMouseOver={() => setHoverLogo(true)}
                onMouseOut={() => setHoverLogo(false)}
              />
            </a>
          </Link>

          <ul className="nav nav-pills">
            <li className="nav-item">
              <Link href="/">
                <a
                  className={classNames("nav-link", {
                    active: hoverLink === 1,
                    "fw-bold": hoverLink === 1,
                  })}
                  onMouseOver={() => {
                    setHoverLink(1);
                  }}
                  onMouseOut={() => {
                    setHoverLink(0);
                  }}
                >
                  Home
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/login">
                <a
                  className={classNames("nav-link", {
                    active: hoverLink === 2,
                    "fw-bold": hoverLink === 2,
                  })}
                  onMouseOver={() => {
                    setHoverLink(2);
                  }}
                  onMouseOut={() => {
                    setHoverLink(0);
                  }}
                >
                  Login
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/signup">
                <a
                  className={classNames("nav-link", {
                    active: hoverLink === 3,
                    "fw-bold": hoverLink === 3,
                  })}
                  onMouseOver={() => {
                    setHoverLink(3);
                  }}
                  onMouseOut={() => {
                    setHoverLink(0);
                  }}
                >
                  Signup
                </a>
              </Link>
            </li>
          </ul>
        </header>
      </div>
    </div>
  );
}

export default Navbar;
