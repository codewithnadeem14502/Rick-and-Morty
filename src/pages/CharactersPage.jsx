import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CharactersPage.css";

function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [genderFilter, setGenderFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, statusFilter, genderFilter, speciesFilter]);

  const fetchData = () => {
    const apiUrl = `https://rickandmortyapi.com/api/character/?page=${currentPage}&name=${searchTerm}&status=${statusFilter}&gender=${genderFilter}&species=${speciesFilter}`;
    axios
      .get(apiUrl)
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="main_container">
      <div className="container-inner">
        <h1 className="main_title">Character's</h1>
        <input
          type="text"
          placeholder="Search by name"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="filter_container">
        <select
          className="filter_input"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Filter by Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          className="filter_input"
          value={genderFilter}
          onChange={(e) => setGenderFilter(e.target.value)}
        >
          <option value="">Filter by Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>
        <select
          className="filter_input"
          value={speciesFilter}
          onChange={(e) => setSpeciesFilter(e.target.value)}
        >
          <option value="">Filter by Species</option>
          <option value="human">Human</option>
          <option value="alien">Alien</option>
          <option value="mytholog">Mytholog</option>
          <option value="robot">Robot</option>
          <option value="cronenberg">Cronenberg</option>
          <option value="unknown">Unknown</option>
        </select>
      </div>

      <div className="middle_container">
        <div className="pg_container">
          <h1 className="pgno">Page no : {currentPage}</h1>
        </div>
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous
          </button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      </div>
      <div className="character-container">
        {characters.map((character) => (
          // redirecting to details pages
          <Link key={character.id} to={`/character/${character.id}`}>
            <div className="character-card">
              <img
                src={character.image}
                alt={character.name}
                className="character-image"
              />
              <p className="character-name">{character.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CharactersPage;
