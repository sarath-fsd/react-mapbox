const { FavoritePlace, validate } = require("../models/favoritePlace");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  const favoritePlaces = await FavoritePlace.find({ userId: clientIP })
    .select("-__v")
    .sort("_id");
  res.send(favoritePlaces);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { type, properties, geometry } = req.body;
  const clientIP = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  let favoritePlace = new FavoritePlace({
    userId: clientIP,
    type,
    properties,
    geometry,
  });

  favoritePlace = await favoritePlace.save();

  res.send(favoritePlace);
});

router.delete("/:id", async (req, res) => {
  const favoritePlace = await FavoritePlace.findByIdAndRemove(req.params.id);

  if (!favoritePlace)
    return res
      .status(404)
      .send("The favorite place with the given ID was not found.");

  res.send(favoritePlace);
});

module.exports = router;
