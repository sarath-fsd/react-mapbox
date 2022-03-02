import React, { useState } from "react";
import { Map, SearchBox } from "../../components";

const Home = () => {
  const [coordinates, setCoordinates] = useState();

  return (
    <>
      <SearchBox
        placeholder="Search"
        onLocationSelect={(selectedLocation) => {
          const center = selectedLocation.center;
          setCoordinates([center[1], center[0]]);
        }}
      />
      <Map coordinates={coordinates} />
    </>
  );
};

export default Home;
