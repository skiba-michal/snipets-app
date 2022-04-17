import React, { useState } from "react";
import "./dashboard.scoped.scss";
import { HeaderNav, TheDrawer } from "@components";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import {  Outlet } from "react-router";

const Dashboard = () => {
  // const dispatch = useDispatch();
  // const fetchAccount = () => {
  //   dispatch(fetchUserProfile(null));
  // };
  const [open, setOpen] = useState(false);
  return (
    <div className="dashboard-wrapper">
      <HeaderNav />
      <div className="dashboard-content-wrapper">
        <div className="show-nav-btn">
          <IconButton onClick={() => setOpen(!open)}>
            <ArrowCircleRightIcon />
          </IconButton>
        </div>
        <TheDrawer setOpen={setOpen} open={open} />
        <div className={`dashboard-content ${open ? "open-dashboard" : "close-dashboard"}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
