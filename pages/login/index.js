import React from "react";
import { getSession } from 'next-auth/react';
import Login from "./../../front_end/components/Login/Login";

function LoginPage() {

  return (
    <Login />
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  // if user logged in 
  // redirect to dashboard
  if (session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default LoginPage;
