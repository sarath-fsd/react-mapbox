const express = require("express");
const favoritePlaces = require("../routes/favoritePlaces");
const error = require("../middleware/error");

module.exports = (app) => {
  app.use(express.json());
  app.use("/api/favoritePlaces", favoritePlaces);
  app.use(error);
};
