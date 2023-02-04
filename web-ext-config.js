module.exports = {
  verbose: true,
  build: {
    overwriteDest: true,
    filename: "goodbye-rfc-2822-date-time.zip",
  },
  ignoreFiles: [
    "README.md",
    "package.json",
    "src",
    "tsconfig.json",
    "web-ext-config.js",
    "yarn.lock",
  ],
  run: {
    devtools: true,
    firefoxProfile: "goodbye-rfc-2822-date-time",
  },
};
