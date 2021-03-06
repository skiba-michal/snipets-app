import { MaterialIcon } from "@interfaces";
import { InputBaseComponentProps } from "@mui/material";
import { ChangeEvent } from "react";

export interface ValidationSettings {
  minLength?: number;
  maxLength?: number;
  isRequired?: boolean;
  basicCharacters?: boolean;
}

export interface BaseInputProps {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setErrorParrent?: (value: boolean) => void;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  customErrorMessage?: string;
  showErrors?: boolean;
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  type?: string;
  validationSettings?: ValidationSettings;
  multiline?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  Icon?: MaterialIcon;
  width?: string;
  inputProps?: InputBaseComponentProps
}
