import axios from "axios";
import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalContext";
import { MAPBOX_TOKEN } from "../../utils/constants";
import "./SearchBox.scss";
import SearchResults from "./SearchResults";
import "./wizard.scss";
import "./wizardLayout.scss";


const SearchBox = ({ placeholder, onLocationSelect }) => {  

  const [locations, setLocations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedPlace, setSelectedPlace] = useState('');

  //#region Handlers
  const handleSearch = async () => {
    try {
      if (search === "") {
        setLocations(null);
        return;
      }

      const res = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?access_token=${MAPBOX_TOKEN}`
      );

      setLocations(res.data.features);
    } catch {
      console.log("error");
    }
  };
  //#endregion

  //#region Supporting Methods
  const getSearchWizardCss = () => {
    const showlocations = locations && locations.length > 0;
    const showSelectedItem = selectedPlace;

    return `wizard${showSelectedItem || showlocations ? " wizard_active" : ""}${
      showlocations ? " wizard_search-results" : ""
    } app__wizard`;
  };

  const getSvgIcon = (iconName) => {
    switch (iconName) {
      case "menu":
        return (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
            <path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z" />
          </svg>
        );

      case "search":
        return (
          <svg
            id="magnifying-glass"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            className="search-field__search-button-icon"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M2 8.875C2 5.07804 5.07804 2 8.875 2C12.672 2 15.75 5.07804 15.75 8.875C15.75 10.7714 14.9822 12.4885 13.7404 13.7323C13.7389 13.7338 13.7375 13.7352 13.736 13.7367C13.7346 13.7381 13.7331 13.7395 13.7317 13.741C12.488 14.9824 10.7711 15.75 8.875 15.75C5.07804 15.75 2 12.672 2 8.875ZM14.4034 15.8183C12.8868 17.0274 10.9653 17.75 8.875 17.75C3.97347 17.75 0 13.7765 0 8.875C0 3.97347 3.97347 0 8.875 0C13.7765 0 17.75 3.97347 17.75 8.875C17.75 10.9657 17.0271 12.8875 15.8177 14.4041L19.7065 18.293C20.0971 18.6835 20.0971 19.3167 19.7065 19.7072C19.316 20.0977 18.6828 20.0977 18.2923 19.7072L14.4034 15.8183Z"
            ></path>
          </svg>
        );
      case "close":
        return (
          <svg
            id="cross"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
            className="search-field__clear-button-icon"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.7071 1.70711C14.0976 1.31658 14.0976 0.683417 13.7071 0.292893C13.3166 -0.0976311 12.6834 -0.0976311 12.2929 0.292893L7 5.58579L1.70711 0.292893C1.31658 -0.0976311 0.683417 -0.0976311 0.292893 0.292893C-0.0976311 0.683417 -0.0976311 1.31658 0.292893 1.70711L5.58579 7L0.292893 12.2929C-0.0976311 12.6834 -0.0976311 13.3166 0.292893 13.7071C0.683417 14.0976 1.31658 14.0976 1.70711 13.7071L7 8.41421L12.2929 13.7071C12.6834 14.0976 13.3166 14.0976 13.7071 13.7071C14.0976 13.3166 14.0976 12.6834 13.7071 12.2929L8.41421 7L13.7071 1.70711Z"
            ></path>
          </svg>
        );
    }
  };

  const renderSearchBox = () => {
    return (
      <div className="search-field wizard__search-field">
        <input
          className="search-field__input"
          placeholder={placeholder}
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          className="search-field__search-button"
          title="Find places"
          onClick={() => {
            handleSearch();
            setSelectedPlace(null);
          }}
        >
          {getSvgIcon("search")}
        </button>
        <div className="search-field__buttons-separator"></div>
        <button
          className="search-field__clear-button"
          title="Clear search"
          onClick={() => {
            setSearch("");
            setLocations(null);
            setSelectedPlace(null);
          }}
        >
          {getSvgIcon("close")}
        </button>
      </div>
    );
  };
  //#endregion

  return (
    <div className={getSearchWizardCss()}>
      {renderSearchBox()}
      <SearchResults
        locations={locations}
        selectedLocation={selectedPlace}
        onLocationSelect={(selectedLocation) => {
          setLocations(null);
          setSelectedPlace(selectedLocation)
          onLocationSelect(selectedLocation);
        }}
      />
    </div>
  );
};

export default SearchBox;
