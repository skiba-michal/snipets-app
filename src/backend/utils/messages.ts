export const validationMessages = Object.freeze({
  loginExist: "Login jest już zajęty",
  toShortPassword: "Hasło musi mieć przynajmniej sześć znaków",
  toShortLogin: "Login musi mieć przynajmniej sześć znaków",
  isRequired: "Wartość jest niezbędna",
  validationFailed: "Błąd walidacji",
  secretKeyIsInvalid: "Niepoprawny klucz",
});

export const errorMessages = Object.freeze({
  userNotFound: "Użytkownik nie został znaleziony",
  badLoginData: "Zły login albo hasło",
  notAuthenticated: "Nie zautoryzowany",
  tokenExpired: "Token wygasł, zaloguj się ponownie",
  notFound: "Nie znaleziono",
  corsBlocked: "Zablokowano przez korsy",
  incorectData: "Niepoprawne dane",
  categoryNotFound: "Kategoria nie została znaleziona",
});

export const succesMessages = Object.freeze({
  userCreated: "Użytkownik został stworzony!",
  logedIn: "Zalogowano",
  logedOut: "Wylogowano",
  categoryCreated: "Kategoria została stworzona",
  snipetCreated: "Snipet został stworzony",
  changesSaved: "Zmiany zostały zapisane"
});
