import React, { useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import { SizeEnum } from "@interfaces";
import { LoadingIconProps } from "./loadingIcon.interface";
import "./loadingIcon.scoped.scss";

export const LoadingIcon = ({ sizeValue = SizeEnum.MEDIUM, fullScreen = false }: LoadingIconProps) => {
  const [thickness, setThickness] = useState(3.6);
  const [size, setSize] = useState(40);

  useEffect(() => {
    switch (sizeValue) {
      case SizeEnum.SMALL:
        setSize(20);
        setThickness(2.4);
        break;
      case SizeEnum.MEDIUM:
        setSize(40);
        setThickness(3.6);
        break;
      case SizeEnum.BIG:
        setSize(80);
        setThickness(6);
        break;
    }
  }, [sizeValue]);

  return (
    <div className={`loading-icon-wrapper ${fullScreen ? "full-screen-loader" : ""}`}>
      <CircularProgress size={size} thickness={thickness} />
    </div>
  );
};
