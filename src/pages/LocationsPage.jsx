import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./LocationsPage.css";

function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // fetch
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/location?page=${currentPage}`)
      .then((response) => {
        setLocations(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, [currentPage]);
  // base on the API limit
  const totalPages = 7;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredLocations = locations.filter((location) => {
    return location.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="main_container">
      <div className="container-inner">
        <h1 className="main_title">Locations</h1>
        <input
          type="text"
          placeholder="Search by name"
          className="seaarch-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="location-container">
        {/* filter location is done */}
        {filteredLocations.map((location) => (
          <div className="location-card" key={location.id}>
            <p className="location-name">{location.name}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span className="pgvalue">
          {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default LocationsPage;
