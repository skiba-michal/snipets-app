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
      "@assets": resolve(__dirname, "src/assets/"),
      "@interfaces": resolve(__dirname, "src/interfaces"),
      "@hooks": resolve(__dirname, "src/hooks"),
      "@models": resolve(__dirname, "models"),
    },
  },
};
