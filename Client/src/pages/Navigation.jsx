import React from "react";
import "../pages/Navigation.css";
import HourManager from "../handle/HourManager";
const Navigation = ({ searchTerm, setSearchTerm, onSearch, logo, weather }) => {
  return (
    <>
      <div className="navbar">
        <div className="nav-container">
          <img src={logo} alt="logo" />
          <div>
            <h1 className="navbar-title">Weather Forecast</h1>
            <h1 className="navbar-title">
              <HourManager weather={weather} />
            </h1>
          </div>
        </div>
        <form onSubmit={onSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button className="navbar-button" type="submit" onClick={onSearch}>
            <img src="./src/assets/search.svg" alt="Search" />
          </button>
        </form>
      </div>
    </>
  );
};

export default Navigation;
