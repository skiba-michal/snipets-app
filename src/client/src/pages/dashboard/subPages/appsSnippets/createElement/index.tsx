import React, { useEffect, useState } from "react";
import { AppSnippetsCreateElementProps } from "./appsSnippetsCreateElement.interfaces";
import "./appsSnippetsCreateElement.scoped.scss";

export const AppsSnippetsCreateElement = ({
  title,
  editElementId,
  data,
  setData,
  formWasSubmitted,
  setFormWasSubmitted,
}: AppSnippetsCreateElementProps) => {
  return <div className="snipets-wrapper">Element create app snip {title}</div>;
};
