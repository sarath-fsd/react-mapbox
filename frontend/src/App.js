import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Navbar, ProtectedRoute } from "./components";
import { GlobalContextProvider } from "./context/GlobalContext";
import { FavoritePlaces, Home, NearByFavoritePlaces } from "./pages";
import { getFavoritePlaces } from "./services/favoritePlaceService";
import { STORE_CONSTANTS } from "./utils/constants";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        // Move API calls to Redux Middle instead of calling from component
        const favoritePlaces = await getFavoritePlaces();

        dispatch({
          type: STORE_CONSTANTS.favoritePlaceReceived,
          payload: {
            favoritePlaces: favoritePlaces.data,
          },
        });
      } catch (error) {}
    })();
  }, []);

  return (
    <GlobalContextProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route
          path="favorite-places"
          element={
            <ProtectedRoute>
              <FavoritePlaces />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="show-near-by-favorite-places"
          element={
            <ProtectedRoute>
              <NearByFavoritePlaces />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </GlobalContextProvider>
  );
};

export default App;
