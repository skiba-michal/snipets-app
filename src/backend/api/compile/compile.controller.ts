import axios, { AxiosRequestConfig } from "axios";
import { Response, NextFunction } from "express";
import { AuthRequest, CompileData } from "@models";
import { compileApi } from "@const";

export const compileCode = (req: AuthRequest, res: Response, next: NextFunction) => {
  const body = req.body as CompileData;

  const data = {
    code: body.code,
    language: body.language,
    input: body.input,
  };

  const config: AxiosRequestConfig = {
    method: "post",
    url: compileApi,
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(response => {
      console.log(response);
      res.status(200).json(response.data);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
