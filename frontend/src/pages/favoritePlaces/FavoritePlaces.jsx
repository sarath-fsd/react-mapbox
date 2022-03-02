import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Map } from "../../components";

const FavoritePlaces = () => {
  const [coordinates, setCoordinates] = useState();
  const favoritePlacesCoordinates = useSelector((state) =>
    state.map((favoritePlace) => {
      const coordinatePoistion = favoritePlace.geometry.coordinates;
      return [coordinatePoistion[0], coordinatePoistion[1]];
    })
  );

  useEffect(() => {
    if (favoritePlacesCoordinates.length > 0) {
      let coordinatePoistion = favoritePlacesCoordinates[0];

      if (favoritePlacesCoordinates.length > 1) {
        const centerFavoritePlace = Math.floor(
          favoritePlacesCoordinates.length / 2
        );
        coordinatePoistion = favoritePlacesCoordinates[centerFavoritePlace];
      }

      setCoordinates([coordinatePoistion[0], coordinatePoistion[1]]);
    }
  }, []);

  return (
    <Map coordinates={coordinates} favoritePlaces={favoritePlacesCoordinates} />
  );
};

export default FavoritePlaces;
