import React, { useState } from "react";
import { Outlet } from "react-router";
import "./science.scoped.scss";

export const Science = () => {
  return (
    <div>
      science
      <Outlet />
    </div>
  );
};
