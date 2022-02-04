import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import {
  hideNavbar,
  hideFooter,
  showNavbar,
  showFooter,
} from "./../../redux/reducers/visible";

import DashboardView from "./DashboardView";

function Dashboard({ children }) {
  const [isMounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [popUp, setPopUp] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  // if user not logged in
  if (status === "unauthenticated" && status !== "loading") {
    // redirect user to login page
    router.push("/login");
  }

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

  return status === "authenticated" ? (
    <DashboardView rightContent={children} />
  ) : null;
}

export default Dashboard;
