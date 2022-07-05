import { Request } from "express";

export interface AuthRequest extends Request {
  userId?: string;
  userName?: string;
}

export interface UserData {
  name: string;
  permissions: string[];
  settings: UserSettings;
  id: string;
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
  showSnippets?: boolean;
  showScience?: boolean;
  showProjectSnippets?: boolean;
  showInterviewQuestions?: boolean;
  showLanguages?: boolean;
  showCompilators?: boolean;
  showGenerators?: boolean;
}

// Response

export interface UserDataDb {
  login: string;
  name: string;
  permissions: string[];
  refreshToken: string;
  password: string;
  settings: UserSettings;
  _id: string;
}

export interface UserDataResponse extends UserData {
  token: string;
}

export interface RefreshTokenResponse {
  token: string;
}