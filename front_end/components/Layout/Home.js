import React from "react";
import Link from "next/link";
import Head from "next/head";
import { useSession } from "next-auth/react";

function Home() {
  const { data: session, status } = useSession();

  let btnLink = null;

  let image = null;

  // if user is logged in
  if (status === "authenticated") {
    btnLink = (
      <Link href="/dashboard">
        <a className="btn btn-warning fw-bold shadow">Dashboard...</a>
      </Link>
    );

    image = (
      <img
        src="/images/auth_image.jpg"
        className="shadow rounded animate__animated animate__fadeInRight"
      />
    );
  } else {
    btnLink = (
      <Link href="/login">
        <a className="btn btn-danger fw-bold shadow">Join Now</a>
      </Link>
    );

    image = (
      <img
        src="/images/side_image.jpg"
        className="shadow rounded animate__animated animate__fadeInRight"
      />
    );
  }

  return (
    <>
      <Head>
        <title>NextJS Project | Home</title>
      </Head>
      <div className="container-fluid">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-6 my-auto text-center animate__animated animate__fadeInLeft">
              <h1>NextJS Project with Auth</h1>
              <p className="lead">
                Checkout this amazing app which is built using NextJS framework
                with MongoDB for database. Project is hosted on Vercel Platform
                & MongoDB Atlas is used for cloud database.
              </p>
              {btnLink}
            </div>
            <div className="col-md-6 my-auto text-center">{image}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
