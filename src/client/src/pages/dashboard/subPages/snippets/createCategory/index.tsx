import { FormWrapper } from "@components";
import React, { useEffect, useState } from "react";
import { SnippetsCreateCategoryProps } from "./snippetsCreateCategory.interfaces";
import "./snippetsCreateCategory.scoped.scss";

export const SnippetsCreateCategory = ({
  editElementId,
  data,
  setData,
  formWasSubmitted,
  setFormWasSubmitted,
}: SnippetsCreateCategoryProps) => {
  return (
    <div className="snipets-wrapper">
      <FormWrapper><div>s</div></FormWrapper>
    </div>
  );
};
