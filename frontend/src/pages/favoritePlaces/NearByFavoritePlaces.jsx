import * as turf from "@turf/turf";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Map, SearchBox } from "../../components";
import { RADIUS_TO_SHOW_FAVORITE_PLACES } from "../../utils/constants";

const NearByFavoritePlaces = () => {
  const userFavoritePlaces = useSelector((state) => state);
  const [coordinates, setCoordinates] = useState();
  const [nearByFavoritePlaces, setNearByFavoritePlaces] = useState();

  const makeRadius = (lngLatArray, radiusInKiloMeters) => {
    const point = turf.point(lngLatArray);

    const buffered = turf.buffer(point, radiusInKiloMeters, {
      units: "kilometers",
    });

    return buffered;
  };

  const spatialJoin = (sourceGeoJSON, filterFeature) => {
    // Loop through all the features in the source geojson and return the ones that
    // are inside the filter feature (buffered radius) and are confirmed landing sites
    const joined = sourceGeoJSON.filter((feature) => {
      return turf.booleanPointInPolygon(feature, filterFeature);
    });

    if (joined) {
      return joined.map((favoritePlace) => {
        const coordinatePoistion = favoritePlace.geometry.coordinates;
        return [coordinatePoistion[0], coordinatePoistion[1]];
      });
    }

    return null;    
  };

  return (
    <>
      <SearchBox
        placeholder="Search"
        onLocationSelect={(selectedLocation) => {
          const center = selectedLocation.center;
          const userSearchedPlace = [center[1], center[0]];

          const searchRadius = makeRadius(userSearchedPlace, RADIUS_TO_SHOW_FAVORITE_PLACES);
          var featuresInBuffer = spatialJoin(userFavoritePlaces, searchRadius);

          setNearByFavoritePlaces(featuresInBuffer);
          setCoordinates(userSearchedPlace);
        }}
      />

      <Map coordinates={coordinates} favoritePlaces={nearByFavoritePlaces} />
    </>
  );
};

export default NearByFavoritePlaces;
