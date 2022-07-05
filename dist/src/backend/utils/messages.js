"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.succesMessages = exports.errorMessages = exports.validationMessages = void 0;
exports.validationMessages = Object.freeze({
    loginExist: "Login jest już zajęty",
    toShortPassword: "Hasło musi mieć przynajmniej sześć znaków",
    toShortLogin: "Login musi mieć przynajmniej sześć znaków",
    isRequired: "Wartość jest niezbędna",
    validationFailed: "Błąd walidacji",
    secretKeyIsInvalid: "Niepoprawny klucz",
});
exports.errorMessages = Object.freeze({
    userNotFound: "Użytkownik nie został znaleziony",
    badLoginData: "Zły login albo hasło",
    notAuthenticated: "Nie zautoryzowany",
    tokenExpired: "Token wygasł, zaloguj się ponownie",
    notFound: "Nie znaleziono",
    corsBlocked: "Zablokowano przez korsy",
    incorectData: "Niepoprawne dane",
    categoryNotFound: "Kategoria nie została znaleziona",
});
exports.succesMessages = Object.freeze({
    userCreated: "Użytkownik został stworzony!",
    logedIn: "Zalogowano",
    logedOut: "Wylogowano",
    categoryCreated: "Kategoria została stworzona",
    snipetCreated: "Snipet został stworzony",
    changesSaved: "Zmiany zostały zapisane"
});
