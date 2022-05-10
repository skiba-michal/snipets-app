import React, { ChangeEvent } from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { TheChecboxProps } from "./theChecbox.interfaces";

export const TheChecbox = ({ value, setValue, label = "", disabled = false }: TheChecboxProps) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.checked)}
          sx={{
            color: "#03A062",
            "&.Mui-checked": {
              color: "#03A062",
            },
            "&.Mui-disabled": {
              color: "#979797",
            },
          }}
          disabled={disabled}
        />
      }
      label={label}
    />
  );
};
