import React, { useEffect, useState } from "react";
import { ScienceCreateElementProps } from "./scienceCreateElement.interfaces";
import "./scienceCreateElement.scoped.scss";

export const ScienceCreateElement = ({
  title,
  editElementId,
  data,
  setData,
  formWasSubmitted,
  setFormWasSubmitted,
}: ScienceCreateElementProps) => {
  return <div className="snipets-wrapper">Element create {title}</div>;
};
