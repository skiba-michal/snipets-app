const { resolve } = require("path");

module.exports = {
  plugins: [
    {
      plugin: require('craco-plugin-scoped-css')
    }
  ],
  webpack: {
    alias: {
      "@components": resolve(__dirname, "src/components"),
      "@store": resolve(__dirname, "src/store/"),
      "@utils": resolve(__dirname, "src/utils"),
      "@const": resolve(__dirname, "src/const"),
      "@styles": resolve(__dirname, "src/styles/"),
      "@interfaces": resolve(__dirname, "src/interfaces"),
      "@models": resolve(__dirname, "../backend/models"),
    },
  },
};
