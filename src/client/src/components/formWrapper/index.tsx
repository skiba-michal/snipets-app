import React from "react";
import { FormWrapperProps } from "./formWrapper.interface";

export const FormWrapper = ({ styleClass = "display-column", width, children }: FormWrapperProps) => {
  return (
    <form className={styleClass} autoComplete="false" style={{ width: width ? width : "" }}>
      {children}
    </form>
  );
};
