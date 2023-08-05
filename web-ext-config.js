module.exports = {
  build: {
    overwriteDest: true,
    filename: "goodbye-rfc-2822-date-time.zip",
  },
  ignoreFiles: [
    "**/*.map",
    "*.tar.gz",
    "README.md",
    "build",
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
