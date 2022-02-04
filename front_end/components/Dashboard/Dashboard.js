import React, { useEffect, useState } from "react";
import DashboardView from "./DashboardView";
import {
  hideNavbar,
  hideFooter,
  showNavbar,
  showFooter,
} from "./../../redux/reducers/visible";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

function Dashboard({ children }) {
  const [isMounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // set mounted to true
    setMounted(true);

    // hide navbar in redux
    dispatch(hideNavbar());

    dispatch(hideFooter());

    // cleanup
    return () => {
      // set mounted to true
      setMounted(false);

      // show navbar in redux
      dispatch(showNavbar());

      dispatch(showFooter());
    };
  }, []);

  // if user not logged in
  if (status !== "authenticated") {
    // show error message
    enqueueSnackbar("Only logged in user can access dashboard.", {
      variant: "error",
      autoHideDuration: 1500,
    });

    // redirect user to login page
    router.push("/login");
  }

  return <DashboardView rightContent={children} />;
}

export default Dashboard;
