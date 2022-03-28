import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: string;
}

// Request

export interface UserLoginData {
  login: string;
  password: string;
}

export interface ResgisterData extends UserLoginData {
  name: string;
  secretKey: string;
}

export interface UserSettings {
  showOnlyMyData?: boolean;
}

// Response

export interface UserDataDb {
  login: string;
  name: string;
  permissions: string[];
  password: string;
  settings: UserSettings;
  _id: string;
}

export interface UserDataResponse {
  name: string;
  permissions: string[];
  settings: UserSettings;
  id: string;
  token?: string;
}
