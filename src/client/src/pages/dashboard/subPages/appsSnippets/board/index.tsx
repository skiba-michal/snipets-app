import React, { useState } from "react";
import "./appsSnippetsBoard.scoped.scss";
import { Outlet } from "react-router";

export const AppsSnippetsBoard = () => {
  return (
    <div>
      AppsSnippetsBoard
      <Outlet />
    </div>
  );
};
