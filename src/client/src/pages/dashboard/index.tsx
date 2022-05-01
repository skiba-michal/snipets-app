import React, { useEffect, useState } from "react";
import "./dashboard.scoped.scss";
import { HeaderNav, TheDrawer } from "@components";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { Outlet, useLocation, useParams } from "react-router";
import { useShowDrawer } from "@hooks";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = useShowDrawer();

  useEffect(() => {
    if (!showDrawer) {
      setOpen(false);
    }
  }, [showDrawer])
  // const location = useLocation();
  // const params = useParams();
  // useEffect(() => {
  //   const { pathname } = location;
  //   console.log(pathname)
  //   console.log(location)
  //   console.log(params)
  // }, [])
  // const dispatch = useDispatch();
  // const fetchAccount = () => {
  //   dispatch(fetchUserProfile(null));
  // };

  return (
    <div className="dashboard-wrapper">
      <HeaderNav />
      <div className="dashboard-content-wrapper">
        {showDrawer && (
          <div className="show-nav-btn">
            <IconButton onClick={() => setOpen(!open)}>
              <ArrowCircleRightIcon />
            </IconButton>
          </div>
        )}
        <TheDrawer setOpen={setOpen} open={open} />
        <div className={`dashboard-content ${open ? "open-dashboard" : "close-dashboard"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
