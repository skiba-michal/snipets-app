import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { PositionEnum, SizeEnum } from "./enums";

export type Size = SizeEnum;
export type MaterialIcon = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};
export type Position = PositionEnum;
