import http from "./httpService";

const apiEndpoint =  "/api/favoriteplaces";

function favoritePlaceUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getFavoritePlaces() {
  return http.get(apiEndpoint);
}

export function saveFavoritePlace(favoritePlace) {
  return http.post(apiEndpoint, favoritePlace);
}

export function deleteFavoritePlace(favoritePlaceId) {
  return http.delete(favoritePlaceUrl(favoritePlaceId));
}
