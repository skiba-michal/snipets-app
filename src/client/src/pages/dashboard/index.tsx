import React from "react";
import { useDispatch } from "react-redux";
import { fetchUserProfile } from "@store/user/user.thunks";
import "./dashboard.scoped.scss";

const Dashboard = () => {
  const dispatch = useDispatch();
  const fetchAccount = () => {
    dispatch(fetchUserProfile(null));
  };
  return (
    <div>
      sdfsdfds
      <button onClick={fetchAccount}>ssssssssssssssss</button>
    </div>
  );
};

export default Dashboard;
