import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const favoritePlaces = useSelector((state) => state);

  if (!favoritePlaces || favoritePlaces.length === 0) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
