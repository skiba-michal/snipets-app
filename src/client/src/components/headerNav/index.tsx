import React, { useState } from "react";
import "./headerNav.scss";
import logo from "@assets/logo_transparent.png";
import { NavLink } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import StarIcon from "@mui/icons-material/Star";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton, Menu, MenuItem, Tooltip } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/Search";

import { httpClient, removeUserToken } from "@utils";
import { apiStructure } from "@const";
import { setUserStatus } from "@store/user/user.reducer";
import { UserStatusEnum } from "@interfaces";
import { useDispatch } from "react-redux";
import { navigation } from "./navData";

const baseDashboardRoute = "/dashboard";

export const HeaderNav = () => {
  const [openMobileMenu, setOpenMobileMenu] = useState(false);

  const anchorElement = document.getElementById("basic-button");
  const dispatch = useDispatch();

  const logoutUser = () => {
    httpClient.post(apiStructure.auth.logout).then(() => {
      removeUserToken();
      dispatch(setUserStatus(UserStatusEnum.UNCONFIRMED));
    });
  };

  return (
    <div className="header-wrapper-nav">
      <NavLink end to={`${baseDashboardRoute}`}>
        <img src={logo} alt="Logo" className="logo" />
      </NavLink>
      <div className="navigation-wrapper-mobile">
        <IconButton id="basic-button" onClick={() => setOpenMobileMenu(!openMobileMenu)}>
          {openMobileMenu ? <MenuOpenIcon className="nav-icon-mobile" /> : <MenuIcon className="nav-icon-mobile" />}
        </IconButton>
        <Menu
          id="basic-menu"
          className="nav-menu-wrapper-mobile"
          anchorEl={anchorElement}
          open={openMobileMenu}
          onClose={() => setOpenMobileMenu(false)}
        >
          {navigation.map(nav => (
            <div className="nav-link-wrapper-mobile">
              <NavLink to={nav.link} className={({ isActive }) => (isActive ? "active-link-mobile" : "")}>
                <p className="nav-link-content-mobile">{nav.title}</p>
              </NavLink>
            </div>
          ))}
        </Menu>
      </div>
      <div className="navigation-wrapper">
        {navigation.map(nav => (
          <div className="nav-link-wrapper">
            <NavLink to={nav.link} className={({ isActive }) => (isActive ? "active-link" : "")}>
              <p className="nav-link-content">{nav.title}</p>
            </NavLink>
          </div>
        ))}
      </div>
      <div className="navigation-icons-wrapper">
        <NavLink end to={`${baseDashboardRoute}`}>
          <Tooltip title="Szukaj">
            <IconButton>
              <SearchIcon className="nav-icon" />
            </IconButton>
          </Tooltip>
        </NavLink>
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
