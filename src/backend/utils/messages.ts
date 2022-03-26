export const validationMessages = Object.freeze({
  loginExist: "Login already exist.",
  toShortPassword: "The password should be at least six characters long.",
  toShortLogin: "The login should be at least six characters long.",
  isRequired: "Value is required.",
  validationFailed: "Validation failed.",
  secretKeyIsInvalid: "Wrong secret key",
});

export const errorMessages = Object.freeze({
  userNotFound: "A yser with this email could not be found.",
  wrongPassword: "Wrong password.",
  notAuthenticated: "Not authenticated.",
  notFound: "Not found."
})

export const succesMessages = Object.freeze({
  userCreated: "User created!",
});
