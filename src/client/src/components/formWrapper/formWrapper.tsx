import React from "react";
import { FormWrapperProps } from "./formWrapper.interface";

export const FormWrapper = ({ styleClass = "display-column", children }: FormWrapperProps) => {
  return (
    <form className={styleClass} autoComplete="false">
      <input type="text" className="display-none" name="name" />
      <input type="password" className="display-none" name="password" />
      {children}
    </form>
  );
};
