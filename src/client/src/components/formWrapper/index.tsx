import React from "react";
import { FormWrapperProps } from "./formWrapper.interface";

export const FormWrapper = ({ styleClass = "display-column", children }: FormWrapperProps) => {
  return (
    <form className={styleClass} autoComplete="false">
      {children}
    </form>
  );
};
