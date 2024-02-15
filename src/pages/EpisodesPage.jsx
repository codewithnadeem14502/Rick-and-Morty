import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EpisodesPage.css";
import { Link } from "react-router-dom";

function EpisodesPage() {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState("");
  const [selectedEpisodeData, setSelectedEpisodeData] = useState(null);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // Fetch episodes from the API
    axios
      .get(`https://rickandmortyapi.com/api/episode`)
      .then((response) => {
        setEpisodes(response.data.results);
        // Pre-select the first episode by default
        if (response.data.results.length > 0) {
          setSelectedEpisode(response.data.results[0].id);
        }
      })
      .catch((error) => {
        console.error("Error fetching episodes:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch characters related to the selected episode
    if (selectedEpisode !== "") {
      axios
        .get(`https://rickandmortyapi.com/api/episode/${selectedEpisode}`)
        .then((response) => {
          setSelectedEpisodeData(response.data);
          setCharacters(response.data.characters);
        })
        .catch((error) => {
          console.error("Error fetching characters:", error);
        });
    }
  }, [selectedEpisode]);

  const handleEpisodeChange = (event) => {
    setSelectedEpisode(event.target.value);
  };

  return (
    <div className="main_container">
      <div className="container-inner">
        {selectedEpisodeData && (
          <h1 className="main_title">
            Episode:{" "}
            <span className="subtitle">
              {selectedEpisodeData.name} - {selectedEpisodeData.air_date}
            </span>
          </h1>
        )}
        <select
          className="esearch-input"
          value={selectedEpisode}
          onChange={handleEpisodeChange}
        >
          {episodes.map((episode) => (
            <option key={episode.id} value={episode.id}>
              {episode.name}
            </option>
          ))}
        </select>
      </div>
      <div className="episode-container">
        {characters.map((characterUrl, index) => (
          <Character key={index} characterUrl={characterUrl} />
        ))}
      </div>
    </div>
  );
}

const Character = ({ characterUrl }) => {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    axios
      .get(characterUrl)
      .then((response) => {
        setCharacter(response.data);
      })
      .catch((error) => {
        console.error("Error fetching character:", error);
      });
  }, [characterUrl]);

  return (
    <div className="character-card">
      {character && (
        <Link key={character.id} to={`/character/${character.id}`}>
          <>
            <img
              src={character.image}
              alt={character.name}
              className="eimage"
            />
            <p>{character.name}</p>
          </>
        </Link>
      )}
    </div>
  );
};

export default EpisodesPage;
