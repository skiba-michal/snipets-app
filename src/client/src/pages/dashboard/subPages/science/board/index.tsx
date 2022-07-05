import { TextEditor } from "@components";
import React, { useState } from "react";
import "./scienceBoard.scoped.scss";


export const ScienceBoard = () => {
  const [elementTitle, setElementTitle] = useState("")
  
  return <div><TextEditor value={elementTitle} setValue={setElementTitle}/></div>;
};
