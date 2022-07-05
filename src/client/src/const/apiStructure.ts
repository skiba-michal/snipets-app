// Shared between client and backend

export const apiStructure = {
  auth: {
    login: "auth/login",
    signup: "auth/signup",
    refreshToken: "auth/refreshToken",
    logout: "auth/logout",
  },
  userData: {
    profile: "userData/profile",
    settings: "userData/settings",
  },
  compile: {
    compile: "compile/compileCode",
  },
  snipets: {
    snipetsDetails: "snipets",
    snipetsCategories: "snipets/categories",
  },
};
