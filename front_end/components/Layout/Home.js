import React from "react";
import Link from "next/link";

function Home() {
  return (
    <div className="container-fluid">
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 my-auto text-center animate__animated animate__fadeInLeft">
            <h1>NextJS Project with Auth</h1>
            <p className="lead">
              Checkout this amazing app which is built using NextJS framework
              with MongoDB for database. Project is hosted on Vercel Platform &
              MongoDB Atlas is used for cloud database.
            </p>
            <Link href="/login">
              <a className="btn btn-danger fw-bold shadow">Join Now</a>
            </Link>
          </div>
          <div className="col-md-6 my-auto text-center">
            <img
              src="/images/side_image.jpg"
              className="shadow rounded animate__animated animate__fadeInRight"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
