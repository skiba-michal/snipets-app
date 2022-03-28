import { RequestError } from "@models";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (error: RequestError, _req: Request, res: Response, _next: NextFunction): void => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data || '';
  res.status(status).json({ message, data });
};
