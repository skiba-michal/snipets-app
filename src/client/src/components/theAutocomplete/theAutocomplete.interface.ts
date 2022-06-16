import { Option } from "@interfaces";

export interface TheAutocompleteProps {
  value: Option | null;
  setValue: (v: Option) => void;
  options: Option[];
  errorMessage?: string;
  showErrors?: boolean;
  label?: string;
  clearIcon?: boolean;
  width?: string | number;
}
