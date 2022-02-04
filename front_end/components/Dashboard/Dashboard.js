import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  hideNavbar,
  hideFooter,
  showNavbar,
  showFooter,
} from "./../../redux/reducers/visible";

import DashboardView from "./DashboardView";

function Dashboard({ children }) {
  const [isMounted, setMounted] = useState(false);

  const dispatch = useDispatch();

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

  return <DashboardView rightContent={children} />;
}

export default Dashboard;
