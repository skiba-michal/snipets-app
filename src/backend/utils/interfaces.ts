export interface UserTokens {
  token: string;
  refreshToken: string;
  userId: string;
}

export interface ValidationStringOptions {
  minLenght?: number;
  maxLenght?: number;
  basicCharactersOnly?: boolean;
}