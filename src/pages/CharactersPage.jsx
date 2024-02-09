import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CharactersPage.css";

function CharactersPage() {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [speciesFilter, setSpeciesFilter] = useState("");
  const [episodeFilter, setEpisodeFilter] = useState("");
  const [episodes, setEpisodes] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character?page=${currentPage}`)
      .then((response) => {
        setCharacters(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching characters:", error);
      });

    // Fetch episodes
    axios
      .get(`https://rickandmortyapi.com/api/episode`)
      .then((response) => {
        setEpisodes(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching episodes:", error);
      });
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  //  filteredCharacters
  const filteredCharacters = characters.filter((character) => {
    const nameMatches = character.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const statusMatches =
      character.status.toLowerCase().includes(statusFilter.toLowerCase()) ||
      !statusFilter;
    const locationMatches =
      character.location.name
        .toLowerCase()
        .includes(locationFilter.toLowerCase()) || !locationFilter;
    const genderMatches =
      character.gender.toLowerCase() === genderFilter.toLowerCase() ||
      !genderFilter;
    const speciesMatches =
      character.species.toLowerCase().includes(speciesFilter.toLowerCase()) ||
      !speciesFilter;

    // Check if any of the character's episodes match the searched episode
    const episodeMatches =
      !episodeFilter ||
      episodes.some(
        (episode) =>
          character.episode.includes(episode.url) &&
          episode.name.toLowerCase().includes(episodeFilter.toLowerCase())
      );

    return (
      nameMatches &&
      statusMatches &&
      locationMatches &&
      genderMatches &&
      speciesMatches &&
      episodeMatches
    );
  });

  const handleEpisodeSearch = (e) => {
    setEpisodeFilter(e.target.value);
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

        <input
          type="text"
          className="search-filter"
          placeholder="Filter by Location"
          value={locationFilter}
          onChange={(e) => setLocationFilter(e.target.value)}
        />
        <input
          type="text"
          className="search-filter"
          placeholder="Filter by Episode"
          value={episodeFilter}
          onChange={handleEpisodeSearch}
        />
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
        {filteredCharacters.map((character) => (
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
