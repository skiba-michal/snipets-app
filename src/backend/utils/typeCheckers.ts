import { JwtPayload } from "jsonwebtoken";

export const isJwtPayload = (value: JwtPayload | string): value is JwtPayload => {
  return typeof value === "string" ? false : true;
};
