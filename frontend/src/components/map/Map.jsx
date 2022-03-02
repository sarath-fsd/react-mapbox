import React, { useEffect, useState } from "react";
import ReactMapGL, {
  FlyToInterpolator,
  GeolocateControl,
  Marker,
  NavigationControl
} from "react-map-gl";
import Location from "../../assets/images/location.png";
import { MAPBOX_TOKEN } from "../../utils/constants";

const initialViewPort = {
  width: "100vw",
  height: "89vh",
  latitude: 0,
  longitude: 0,
  zoom: 12,
  transitionDuration: 10,
};

const geolocateControlStyle = {
  right: 10,
  bottom: 30,
};

const navControlStyle = {
  right: 10,
  top: 10,
};

const Map = ({ coordinates, favoritePlaces, zoom }) => {  
  const [viewport, setViewport] = useState(initialViewPort);

  //#region Hooks
  useEffect(() => {
    if (!favoritePlaces || favoritePlaces.length === 0) {
      // Setting up map to the user location.   It helps to user to view the places on first glance on the Map.
      navigator.geolocation.getCurrentPosition((position) => {
        setViewport({
          ...viewport,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (zoom) {
      setViewport({
        ...viewport,
        zoom,
      });
    }
  }, [zoom]);

  useEffect(() => {
    if (coordinates) {
      setViewport({
        ...viewport,
        latitude: coordinates[0],
        longitude: coordinates[1],
      });
    }
  }, [coordinates]);
  //#endregion

  return (
    <>
      {viewport.longitude > 0 && (
        <ReactMapGL className="ac-maps"
          {...viewport}
          mapboxApiAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          onViewportChange={(nextViewport) => setViewport(nextViewport)}
          transitionDuration={2000}
          transitionInterpolator={new FlyToInterpolator()}
        >
          <NavigationControl
            style={navControlStyle}
            showCompass={true}
            showZoom={true}
          />

          <GeolocateControl
            style={geolocateControlStyle}
            positionOptions={{ enableHighAccuracy: true }}
            trackUserLocation={true}
            auto={false}
            position="top-left"
          />

          {favoritePlaces &&
            favoritePlaces.map((favoritePlace, index) => {
              return (
                <Marker
                  key={index + 1}
                  latitude={favoritePlace[0]}
                  longitude={favoritePlace[1]}
                >
                  <img src={Location} alt="pin" height="30px" width="30px" />
                </Marker>
              );
            })}
        </ReactMapGL>
      )}
    </>
  );
};

export default Map;
