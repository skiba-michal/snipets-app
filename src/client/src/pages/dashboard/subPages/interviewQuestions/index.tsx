import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ModuleTypeEnum } from "@interfaces";
import { setDrawerData } from "@store/options/options.reducer";
import { Outlet } from "react-router";
import "./interviewQuestions.scoped.scss";

export const InterviewQuestions = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setDrawerData(ModuleTypeEnum.INTERVIEWQUESTIONS))
  }, [dispatch])
  return (
    <div>
      InterviewQuestions
      <Outlet />
    </div>
  );
};
