const winston = require("winston");
require("express-async-errors");

module.exports = () => {
  winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true, format: winston.format.json() }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", (ex) => {
    throw ex;
  });

  winston.add(new winston.transports.Console({ colorize: true, prettyPrint: true, format: winston.format.json() }));
  winston.add(new winston.transports.File({ filename: "logfile.log" }));
};
