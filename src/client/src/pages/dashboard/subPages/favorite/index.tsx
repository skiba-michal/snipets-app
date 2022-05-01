import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModuleTypeEnum } from "@interfaces";
import { setDrawerData } from "@store/options/options.reducer";
import "./favorite.scoped.scss";


export const Favorite = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDrawerData(ModuleTypeEnum.FAVORITE))
  }, [dispatch])
  return <div>favorite</div>;
};
