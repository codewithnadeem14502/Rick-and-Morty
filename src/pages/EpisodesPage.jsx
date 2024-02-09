import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./EpisodesPage.css";

function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  // fetch
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/episode?page=${currentPage}`)
      .then((response) => {
        setEpisodes(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching episodes:", error);
      });
  }, [currentPage]);
  // base on the API limit
  const totalPages = 3;

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredEpisodes = episodes.filter((episode) => {
    return episode.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="main_container">
      <div className="container-inner">
        <h1 className="main_title">Episodes</h1>
        <input
          type="text"
          placeholder="Search by name"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="episode-container">
        {/* filter episode is done */}
        {filteredEpisodes.map((episode) => (
          <div className="episode-card" key={episode.id}>
            <p className="episode-name">{episode.name}</p>
          </div>
        ))}
      </div>
      {/* pagination */}
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

export default EpisodesPage;
