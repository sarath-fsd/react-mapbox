import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import AppLogo from "../../assets/images/app-logo.png";

const Navbar = () => {
  const favoritePlaces = useSelector((state) => state);

  return (
    <nav>
      <img src={AppLogo} />
      <NavLink to="/">Home</NavLink>
      {favoritePlaces.length > 0 && (
        <>
          <NavLink to="/favorite-places">My Favorite Places</NavLink>
          <NavLink to="/show-near-by-favorite-places">
            Near by Favorite Places
          </NavLink>
        </>
      )}
    </nav>
  );
};
export default Navbar;
