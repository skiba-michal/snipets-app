import { MaterialIcon, Size, SizeEnum } from "@interfaces";
import type { Position } from "@interfaces";

export interface BaseButtonProps {
  variant?: "text" | "outlined" | "contained";
  text?: string;
  styleClass?: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  position?: Position;
  StartIcon?: MaterialIcon;
  EndIcon?: MaterialIcon;
  size?: "small" | "medium" | "large";
  buttonColorVariant?: 'normal' | 'dark';
}
