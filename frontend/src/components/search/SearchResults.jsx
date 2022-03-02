import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { STORE_CONSTANTS } from "../../utils/constants";
import "./SearchResults.scss";
import "./SelectedItemDetails.scss";
import {
  saveFavoritePlace,
  deleteFavoritePlace,
} from "../../services/favoritePlaceService";

const SearchResults = ({ locations, selectedLocation, onLocationSelect }) => {
  const location = useLocation();

  const favoritePlaces = useSelector((favoritePlaces) => favoritePlaces);
  const dispatch = useDispatch();

  const [selectedPlace, setSelectedPlace] = useState(null);

  useEffect(() => {
    setSelectedPlace(selectedPlace);
  }, [selectedLocation]);

  //#region Handlers
  const handleOnItemSelect = (selectedLocation) => {
    setSelectedPlace(selectedLocation);
    onLocationSelect(selectedLocation);
  };
  //#endregion

  //#region Supporting Methods
  const getPlaceAndAddress = (selectedLocation) => {
    const fullAddress = selectedLocation.place_name;
    const placeNameIndex = fullAddress.indexOf(", ");
    const placeName = fullAddress.substring(0, placeNameIndex);
    const address = fullAddress.substring(
      placeNameIndex + 1,
      fullAddress.length
    );

    return {
      place: placeName,
      address: address,
    };
  };

  const renderlocations = () => {
    return (
      <ul className="search-results wizard__search-results">
        {locations?.map((record, index) => {
          const { place, address } = getPlaceAndAddress(record);
          return (
            <li key={index} className="search-results__result">
              <button
                className="search-results__result-button"
                onClick={() => handleOnItemSelect(record)}
              >
                <span className="search-results__result-index">
                  {index + 1}.
                </span>
                <div className="search-results__result-text">
                  <div className="search-results__result-title" title={place}>
                    {place}
                  </div>
                  <div
                    className="search-results__result-details"
                    title={address}
                  >
                    {address}
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    );
  };

  const renderSelectedLocation = () => {
    const { place, address } = getPlaceAndAddress(selectedPlace);

    const selectedFavoritePlace = favoritePlaces.find(
      (fp) => fp.properties.placeId === selectedPlace.id
    );

    const isFavoritePlace = selectedFavoritePlace ? true : false;

    const action = `${
      isFavoritePlace ? "Remove from" : "Add to"
    } favorite list`;

    return (
      <div className="wizard-layout item-details wizard__item-details">
        <div className="wizard-layout__header">
          <div className="wizard-layout__title-container">
            <h1 className="wizard-layout__title">{place}</h1>
          </div>
        </div>
        <div className="wizard-layout__content">
          <ul className="item-details__properties">
            <li className="item-details__property">
              <h3 className="item-details__property-title">Address:</h3>
              <span className="item-details__property-value">{address}</span>
              {location.pathname === "/" && (
                <div className="wizard-layout__favorite-button-container">
                  <button
                    className={`wizard-layout__favorite-button wizard-layout__${
                      isFavoritePlace ? "remove-from" : "add-to"
                    }-favorite`}
                    title={action}
                    onClick={async () => {
                      if (!isFavoritePlace) {
                        const { id, type, text, geometry } = selectedPlace;
                        let favoritePlace = {
                          type,
                          properties: {
                            placeId: id,
                            name: text,
                            address: address,
                          },
                          geometry: {
                            type: "Point",
                            coordinates: [
                              geometry.coordinates[1],
                              geometry.coordinates[0],
                            ],
                          },
                        };

                        try {
                          // Move API calls to Redux Middle instead of calling from component
                          const saveReqRes = await saveFavoritePlace(
                            favoritePlace
                          );

                          favoritePlace = saveReqRes.data;
                        } catch (error) {}

                        dispatch({
                          type: isFavoritePlace
                            ? STORE_CONSTANTS.favoritePlaceRemoved
                            : STORE_CONSTANTS.favoritePlaceAdded,
                          payload: {
                            favoritePlace: favoritePlace,
                          },
                        });
                      } else {
                        dispatch({
                          type: isFavoritePlace
                            ? STORE_CONSTANTS.favoritePlaceRemoved
                            : STORE_CONSTANTS.favoritePlaceAdded,
                          payload: {
                            favoritePlacePlaceId: selectedPlace.id,
                          },
                        });

                        try {
                          // Move API calls to Redux Middle instead of calling from component
                          deleteFavoritePlace(selectedFavoritePlace._id);
                        } catch (error) {}
                      }
                    }}
                  >
                    {action}
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    );
  };
  //#endregion

  return (
    <div className="wizard__content">
      {locations && locations.length > 0 && (
        <div className="wizard-layout">
          <div className="wizard-layout__content">{renderlocations()}</div>
        </div>
      )}
      {selectedLocation && renderSelectedLocation()}
    </div>
  );
};

export default SearchResults;
