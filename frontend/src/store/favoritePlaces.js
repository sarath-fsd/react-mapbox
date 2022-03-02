import { STORE_CONSTANTS } from "../utils/constants";

// Reducers
export default function reducer(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case STORE_CONSTANTS.favoritePlaceReceived:
      return [...payload.favoritePlaces];
    case STORE_CONSTANTS.favoritePlaceAdded:
      return [...state, payload.favoritePlace];
    case STORE_CONSTANTS.favoritePlaceRemoved:
      return state.filter(
        (favoritePlace) =>
          favoritePlace.properties.placeId !==
          payload.favoritePlacePlaceId
      );
    default:
      return state;
  }
}
