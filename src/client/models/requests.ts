import { ValidationError } from "express-validator";

export interface RequestError extends Error {
  statusCode?: number;
  data?: ValidationError[];
}

export interface RequestResponse<T> {
  message?: string;
  data?: T;
}
