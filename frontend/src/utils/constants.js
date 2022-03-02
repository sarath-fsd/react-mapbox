// Action Types
export const STORE_CONSTANTS = {
  favoritePlaceReceived: "favoritePlaceReceived",
  favoritePlaceAdded: "favoritePlaceAdded",
  favoritePlaceRemoved: "favoritePlaceRemoved",
};

// Need to read this value from .env file
export const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;

export const RADIUS_TO_SHOW_FAVORITE_PLACES =
  process.env.REACT_APP_RADIUS_TO_SHOW_FAVORITE_PLACES;
