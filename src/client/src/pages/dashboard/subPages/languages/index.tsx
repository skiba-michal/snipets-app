import React, { useState } from "react";
import { Outlet } from "react-router";
import "./languages.scoped.scss";


export const Languages = () => {
  return <div>languages <Outlet /></div>;
};
