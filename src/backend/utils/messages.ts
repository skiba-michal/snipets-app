export const validationMessages = Object.freeze({
  loginExist: "Login already exist",
  toShortPassword: "The password should be at least six characters long",
  toShortLogin: "The login should be at least six characters long",
  isRequired: "Value is required",
  validationFailed: "Validation failed",
  secretKeyIsInvalid: "Wrong secret key",
});

export const errorMessages = Object.freeze({
  userNotFound: "User not found",
  badLoginData: "Wrong login or password",
  notAuthenticated: "Not authenticated",
  tokenExpired: "The token has expired, please login again",
  notFound: "Not found",
  corsBlocked: "Not allowed by CORS",
});

export const succesMessages = Object.freeze({
  userCreated: "User created!",
  logedIn: "You are loged in",
  logedOut: "You are loged out"
});
