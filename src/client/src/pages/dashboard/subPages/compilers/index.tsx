import React, { useState } from "react";
import "./compilers.scoped.scss";
import { Outlet } from "react-router";

export const Compilers = () => {
  return (
    <div>
      compilers <Outlet />
    </div>
  );
};
