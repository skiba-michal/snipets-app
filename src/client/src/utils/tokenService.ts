const tokenLocalStorageKey = "dev-assistant-app-token";

export const getUserToken = (): string => {
  return localStorage.getItem(tokenLocalStorageKey) || '';
};

export const setUserToken = (token: string) => {
  localStorage.setItem(tokenLocalStorageKey, token);
};

export const removeUserToken = () => {
  localStorage.removeItem(tokenLocalStorageKey);
};
