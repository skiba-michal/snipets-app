import React from "react";
import "./headerNav.scoped.scss";
import logo from "@assets/logo_transparent.png";
import { NavLink, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StarIcon from "@mui/icons-material/Star";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Tooltip } from "@mui/material";
import { httpClient, removeUserToken } from "@utils";
import { apiStructure } from "@const";
import { setUserStatus } from "@store/user/user.reducer";
import { UserStatusEnum } from "@interfaces";
import { useDispatch } from "react-redux";

const baseDashboardRoute = "/dashboard";

export const HeaderNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    httpClient.post(apiStructure.auth.logout).then(() => {
      removeUserToken();
      dispatch(setUserStatus(UserStatusEnum.UNCONFIRMED));

      // setTimeout(() => {
      //   navigate("/");
      // }, 100);
    });
  };
  return (
    <div className="header-wrapper">
      <NavLink end to={`${baseDashboardRoute}`}>
        <img src={logo} alt="Logo" className="logo" />
      </NavLink>
      <div className="navigation-wrapper">
        <div className="nav-link-wrapper">
          <NavLink
            to={`${baseDashboardRoute}/snippets`}
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            <p className="nav-link-content">Snipety</p>
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink
            to={`${baseDashboardRoute}/science`}
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            <p className="nav-link-content">Nauka</p>
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink
            to={`${baseDashboardRoute}/interview-questions`}
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            <p className="nav-link-content">Pytania rekrutacyjne</p>
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink
            to={`${baseDashboardRoute}/languages`}
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            <p className="nav-link-content">Języki</p>
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink
            to={`${baseDashboardRoute}/compilers`}
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            <p className="nav-link-content">Komplitory</p>
          </NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink
            to={`${baseDashboardRoute}/generators`}
            className={({ isActive }) => (isActive ? "nav-link active-link" : "nav-link")}
          >
            <p className="nav-link-content">Generatory</p>
          </NavLink>
        </div>
      </div>
      <div className="navigation-icons-wrapper">
        <NavLink end to={`${baseDashboardRoute}`}>
          <Tooltip title="Ulubione">
            <IconButton>
              <StarIcon className="nav-icon" />
            </IconButton>
          </Tooltip>
        </NavLink>
        <NavLink end to={`${baseDashboardRoute}/settings`}>
          <Tooltip title="Ustawienia">
            <IconButton>
              <SettingsIcon className="nav-icon" />
            </IconButton>
          </Tooltip>
        </NavLink>
        <Tooltip title="Wyloguj">
          <IconButton onClick={logoutUser}>
            <ExitToAppIcon className="nav-icon" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};
