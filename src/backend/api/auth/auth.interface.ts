export interface UserLoginData {
  email: string;
  password: string;
}

export interface User extends UserLoginData {
  name: string;
  permissions: string[];
  _id?: string;
}
