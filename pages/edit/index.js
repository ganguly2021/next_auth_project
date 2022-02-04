import React from "react";
import { getSession } from "next-auth/react";
import EditProfile from "../../front_end/components/EditProfile/EditProfile";
import Dashboard from "./../../front_end/components/Dashboard/Dashboard";

function EditProfilePage() {
  return (
    <Dashboard>
      <EditProfile />
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

export default EditProfilePage;
