export interface UserLoginData {
  login: string;
  password: string;
}

export interface User extends UserLoginData {
  name: string;
  permissions: string[];
  id: string;
}
