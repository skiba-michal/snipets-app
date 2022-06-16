import React, { useEffect, useState } from "react";
import { SnippetsCreateElementProps } from "./snippetsCreateElement.interfaces";
import "./snippetsCreateElement.scoped.scss";

export const SnippetsCreateElement = ({
  title,
  editElementId,
  data,
  setData,
  formWasSubmitted,
  setIsError,
}: SnippetsCreateElementProps) => {
  return <div className="snipets-wrapper">Element create {title}</div>;
};
