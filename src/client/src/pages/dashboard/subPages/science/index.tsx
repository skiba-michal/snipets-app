import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModuleTypeEnum } from "@interfaces";
import { setDrawerData } from "@store/options/options.reducer";
import { Outlet } from "react-router";
import "./science.scoped.scss";

export const Science = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDrawerData(ModuleTypeEnum.SCIENCE))
  }, [dispatch])
  return (
    <div>
      science
      <Outlet />
    </div>
  );
};
