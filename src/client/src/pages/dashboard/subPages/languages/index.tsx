import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModuleTypeEnum } from "@interfaces";
import { setDrawerData } from "@store/options/options.reducer";
import { Outlet } from "react-router";
import "./languages.scoped.scss";


export const Languages = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDrawerData(ModuleTypeEnum.LANGUAGES))
  }, [dispatch])
  return <div>languages <Outlet /></div>;
};
