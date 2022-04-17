import React from "react";
import { LoadingIcon } from "@components";
import Button from "@mui/material/Button";
import { PositionEnum, SizeEnum } from "@interfaces";
import { BaseButtonProps } from "./baseButton.interfaces";
import "./baseButton.scoped.scss";

export const BaseButton = ({
  variant = "contained",
  EndIcon,
  StartIcon,
  text = "",
  onClick = () => {},
  styleClass = "",
  disabled = false,
  loading = false,
  position = PositionEnum.UNSET,
  size = 'small'
}: BaseButtonProps) => {
  return (
    <div className={`button-wrapper ${styleClass} ${position}`}>
      <Button
        size={size}
        variant={variant}
        startIcon={StartIcon ? <StartIcon /> : null}
        endIcon={EndIcon && !loading ? <EndIcon /> : null}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
        {loading && (
          <div className="loader">
            <LoadingIcon sizeValue={SizeEnum.SMALL} />
          </div>
        )}
      </Button>
    </div>
  );
};
