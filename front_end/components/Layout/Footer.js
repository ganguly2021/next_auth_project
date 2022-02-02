import React, { useState, useEffect } from "react";
import Link from "next/link";
import className from "classnames";

function Footer() {
  const [hoverLink, setHoverLink] = useState(0);

  useEffect(() => {
    // cleanup
    return () => {
      setHoverLink(0);
    };
  }, []);

  return (
    <div>
      <footer className="py-3 my-4 shadow-sm">
        <ul className="nav justify-content-center border-bottom pb-3 mb-3">
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
        </ul>
        <p className="text-center text-danger fw-bold">
          &copy; {new Date().getFullYear()} NextJS, Inc
        </p>
      </footer>
    </div>
  );
}

export default Footer;
