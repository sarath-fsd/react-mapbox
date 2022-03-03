const helmet = require("helmet");
const compresssion = require("compression");

module.exports = function (app) {
  app.use(helmet());
  app.use(compresssion());
};
