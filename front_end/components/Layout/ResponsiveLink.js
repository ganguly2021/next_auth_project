import React, { useState } from "react";
import Link from "next/link";
import classnames from "classnames";
import { signOut } from "next-auth/react";

function ResponsiveLink() {
  const [hoverLink, setHoverLink] = useState(0);

  return (
    <div className="text-center">
      <Link href="/dashboard" passHref>
        <a
          className={classnames("btn", {
            "text-danger": hoverLink === 1,
            "fw-bold": hoverLink === 1,
          })}
          onMouseOut={() => setHoverLink(0)}
          onMouseOver={() => setHoverLink(1)}
        >
          Dashboard
        </a>
      </Link>
      <Link href="/" passHref>
        <a
          className={classnames("btn", {
            "text-danger": hoverLink === 2,
            "fw-bold": hoverLink === 2,
          })}
          onMouseOut={() => setHoverLink(0)}
          onMouseOver={() => setHoverLink(2)}
        >
          Home
        </a>
      </Link>
      <Link href="/edit" passHref>
        <a
          className={classnames("btn", {
            "text-danger": hoverLink === 3,
            "fw-bold": hoverLink === 3,
          })}
          onMouseOut={() => setHoverLink(0)}
          onMouseOver={() => setHoverLink(3)}
        >
          Edit
        </a>
      </Link>
      <button
        className={classnames("btn", {
          "text-danger": hoverLink === 4,
          "fw-bold": hoverLink === 4,
        })}
        onMouseOut={() => setHoverLink(0)}
        onMouseOver={() => setHoverLink(4)}
        onClick={() => signOut()}
      >
        Signout
      </button>
    </div>
  );
}

export default ResponsiveLink;
