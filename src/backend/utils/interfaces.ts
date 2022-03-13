import { ValidationError } from "express-validator";
import { Request } from "express";

export interface RequestError extends Error {
  statusCode?: number,
  data?: ValidationError[],
}
export interface AuthRequest extends Request {
  userId?: string;
}