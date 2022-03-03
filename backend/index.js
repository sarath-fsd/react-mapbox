const winston = require("winston");
const express = require("express");
const config = require("config");
const app = express();

require("./startup/logging")();
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/prod")(app);

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () => {
  winston.info(`App Env: ${app.get('env')}`);
  winston.info(`Listening on port ${port}...`);
});

module.exports = server;
