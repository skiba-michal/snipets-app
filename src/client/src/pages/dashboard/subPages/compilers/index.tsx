import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModuleTypeEnum } from "@interfaces";
import { setDrawerData } from "@store/options/options.reducer";
import "./compilers.scoped.scss";
import { Outlet } from "react-router";

export const Compilers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDrawerData(ModuleTypeEnum.COMPILATORS))
  }, [dispatch])
  return (
    <div>
      compilers <Outlet />
    </div>
  );
};
