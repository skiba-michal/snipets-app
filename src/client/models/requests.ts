import { ValidationError } from "express-validator";

export interface RequestError extends Error {
  statusCode?: number;
  data?: ValidationError[];
}

export interface RequestResponse {
  message?: string;
  data?: any;
}
