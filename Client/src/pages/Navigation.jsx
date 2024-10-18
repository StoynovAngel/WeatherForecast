import React from "react";
import "../pages/Navigation.css";
const Navigation = ({ searchTerm, setSearchTerm, onSearch, logo }) => {
  return (
    <>
      <div className="navbar">
        <div className="nav-container">
          <img src={logo} alt="logo" />
          <h1 className="navbar-title">Weather Forecast</h1>
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
