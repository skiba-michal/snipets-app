import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: string;
}

export interface UserLoginData {
  login: string;
  password: string;
}

export interface User extends UserLoginData {
  name: string;
  permissions: string[];
  _id?: string;
}

export interface ResgisterData extends UserLoginData {
  name: string;
  secretKey: string;
}