import React from "react";
import { FormControlLabel, styled, Switch } from "@mui/material";
import { TheSwitchProps } from "./theSwitch.interface";

const GreenSwitch = styled(Switch)(() => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#03A062",
  },
  "& .MuiSwitch-switchBase": {
    color: "#50967a",
  },
  "& .MuiSwitch-switchBase.Mui-disabled": {
    color: "#585858",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#03A062",
  },
  "& .MuiSwitch-track": {
    backgroundColor: "#b6b6b6",
  },
}));

export const TheSwitch = ({ value, setValue, label = "", disabled = false }: TheSwitchProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.checked);
  };

  return (
    <FormControlLabel
      control={<GreenSwitch value={value} onChange={handleChange} disabled={disabled} />}
      label={label}
    />
  );
};
