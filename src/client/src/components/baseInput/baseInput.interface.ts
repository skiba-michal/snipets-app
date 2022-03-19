import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ChangeEvent } from "react";

export interface ValidationSettings {
  minLength: number;
  maxLength: number;
}

export interface InputProps {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  showErrors?: boolean;
  label?: string;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  type?: string;
  validationSettings?: ValidationSettings;
  multiline?: boolean;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}
