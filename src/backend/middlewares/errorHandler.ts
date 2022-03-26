import { RequestError } from "@models";
import { Request, Response } from "express";

export const errorHandler = (error: RequestError, req: Request, res: Response): void => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
};
