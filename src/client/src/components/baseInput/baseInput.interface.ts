import { MaterialIcon } from "@interfaces";
import { ChangeEvent } from "react";

export interface ValidationSettings {
  minLength?: number;
  maxLength?: number;
  isRequired?: boolean;
}

export interface InputProps {
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
  Icon?: MaterialIcon;
  width?: string;
}
