import React, { useEffect, useState } from "react";
import { InterviewQuestionsCreateElementProps } from "./interviewQuestionsCreateElement.interfaces";
import "./interviewQuestionsCreateElement.scoped.scss";

export const InterviewQuestionsCreateElement = ({
  title,
  editElementId,
  data,
  setData,
  formWasSubmitted,
  setFormWasSubmitted,
}: InterviewQuestionsCreateElementProps) => {
  return <div className="snipets-wrapper">Element create inter {title}</div>;
};
