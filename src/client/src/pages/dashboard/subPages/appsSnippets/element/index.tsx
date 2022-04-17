import React, { useState } from "react";
import "./appsSnippetsElement.scoped.scss";
import { Outlet } from "react-router";

export const AppsSnippetsElement = () => {
  return (
    <div>
      AppsSnippetsElement <Outlet />
    </div>
  );
};
