import React, { useState } from "react";
import { Outlet } from "react-router";
import "./interviewQuestions.scoped.scss";

export const InterviewQuestions = () => {
  return (
    <div>
      InterviewQuestions
      <Outlet />
    </div>
  );
};
