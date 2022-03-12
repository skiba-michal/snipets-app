import { RequestError } from "@utils/interfaces";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (error: RequestError, req: Request, res: Response, next: NextFunction): void => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
};
