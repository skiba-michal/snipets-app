import { TheAutocomplete, TheModal } from "@components";
import { ModuleTypeEnum } from "@interfaces";
import { setDrawerData } from "@store/options/options.reducer";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router";
import "./snipets.scoped.scss";

export const Snippets = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDrawerData(ModuleTypeEnum.SNIPPETS))
  }, [])
  
  return (
    <div className="snipets-wrapper">
        ff
      <Outlet />
    </div>
  );
};
