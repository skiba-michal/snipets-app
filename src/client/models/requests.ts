import { ValidationError } from "express-validator";

export interface RequestError extends Error {
  statusCode?: number;
  data?: {
    errors?: ValidationError[];
    isTokenExpired?: boolean;
    isRefreshTokenExpired?: boolean;
  }
}

export interface RequestResponse<T> {
  message?: string;
  data?: T;
}

export interface CreatedBy {
  userId: string;
  userName: string;
  date: string;
}