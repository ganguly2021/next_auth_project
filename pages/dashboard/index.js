import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import Dashboard from "../../front_end/components/Dashboard/Dashboard";
import Intro from "../../front_end/components/Dashboard/Intro";

function DashboardPage({}) {
  return (
    <Dashboard>
      <Intro />
    </Dashboard>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  // if user not authenticated
  if (!session) {
    return {
      redirect: {
        destination: "/login",
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

export default DashboardPage;
