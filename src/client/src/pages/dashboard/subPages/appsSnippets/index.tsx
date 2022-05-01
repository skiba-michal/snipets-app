import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModuleTypeEnum } from "@interfaces";
import { setDrawerData } from "@store/options/options.reducer";
import "./appsSnippets.scoped.scss";


export const AppsSnippets = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDrawerData(ModuleTypeEnum.APPSNIPPTES))
  }, [dispatch])
  return <div>AppsSnippets</div>;
};
