const { resolve } = require("path");

module.exports = {
  webpack: {
    alias: {
      "@components": resolve(__dirname, "src/components/"),
      "@store": resolve(__dirname, "src/store/"),
      "@utils": resolve(__dirname, "src/utils/"),
      "@const": resolve(__dirname, "src/const/"),
      "@models": resolve(__dirname, "../backend/models"),
    },
  },
};
