import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModuleTypeEnum } from "@interfaces";
import { setDrawerData } from "@store/options/options.reducer";
import "./generators.scoped.scss";
import { Outlet } from "react-router";

export const Generators = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDrawerData(ModuleTypeEnum.GENERATORS))
  }, [dispatch])
  return (
    <div>
      Generators <Outlet />
    </div>
  );
};
