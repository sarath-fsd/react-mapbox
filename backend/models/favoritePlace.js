const Joi = require('joi');
const mongoose = require('mongoose');

const favoritePlaceSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  type: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  properties: new mongoose.Schema({
    placeId: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 50
    },
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50
    },
    address: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 150
    }
  }),
  geometry: new mongoose.Schema({
    type: {
      type: String,      
      required: true,
    },
    coordinates: {
      type: [Number],      
      required: true,      
    }    
  })
});

const FavoritePlace = mongoose.model('favoritePlace', favoritePlaceSchema);

function validateFavoritePlace(favoritePlace) {
  const geometrySchema = Joi.object({    
    type: Joi.string().valid('Point'),
    coordinates: Joi.array().required()
  });

  const propertiesSchema = Joi.object({    
    placeId: Joi.string().min(1).max(50).required(),
    name: Joi.string().min(5).max(50).required(),
    address: Joi.string().min(5).max(150).required()
  });

  const schema = Joi.object({    
    type: Joi.string().min(5).max(50).required(),
    properties: propertiesSchema,
    geometry: geometrySchema
  });

  return schema.validate(favoritePlace);
}

module.exports = {
  FavoritePlace,
  validate: validateFavoritePlace,
  favoritePlaceSchema
}