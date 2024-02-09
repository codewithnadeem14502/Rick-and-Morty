// Navbar.js
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import CSS file for Navbar styling

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="first_container">
          <Link to="/" className="navbar-brand">
            Rick and Morty
          </Link>
        </div>
        <div className="second_container">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/episodes" className="nav-link">
                Episodes
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/locations" className="nav-link">
                Locations
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
