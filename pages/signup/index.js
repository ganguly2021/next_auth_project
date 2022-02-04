import React from 'react';
import { getSession } from 'next-auth/react';
import Signup from '../../front_end/components/Signup/Signup';

function SignUpPage() {
  return <Signup />;
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

export default SignUpPage;
