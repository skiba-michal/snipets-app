import React, { useState } from "react";
import "./generators.scoped.scss";
import { Outlet } from "react-router";

export const Generators = () => {
  return (
    <div>
      Generators <Outlet />
    </div>
  );
};
