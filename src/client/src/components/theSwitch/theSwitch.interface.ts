export interface TheSwitchProps {
  value: boolean;
  setValue: (v: boolean) => void;
  label?: string;
  disabled?: boolean;
}