import React, { useState } from "react";
import { Outlet } from "react-router";
import "./snipets.scoped.scss";

export const Snippets = () => {
  return (
    <div>
      Snipki
      <Outlet />
    </div>
  );
};
