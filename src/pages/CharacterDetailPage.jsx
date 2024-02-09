import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./CharacterDetailPage.css";
import Loader from "../components/Loader";
function CharacterDetailPage() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [origin, setOrigin] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => {
        setTimeout(() => {
          setIsLoading(false);
          setCharacter(response.data);
          // Fetch episodes details
          Promise.all(
            response.data.episode.map((episodeUrl) =>
              axios.get(episodeUrl).then((res) => res.data.name)
            )
          ).then((episodes) => setEpisodes(episodes));

          // Fetch origin details
          axios
            .get(response.data.origin.url)
            .then((res) => {
              setOrigin(res.data);
              // console.log("orgini data :", res.data);
            })
            .catch((error) => {
              console.error("Error fetching origin details:", error);
            });

          // Fetch location details
          axios
            .get(response.data.location.url)
            .then((res) => {
              setLocation(res.data);
              // console.log("Location data : ", res.data);
            })
            .catch((error) => {
              console.error("Error fetching location details:", error);
            });
        }, 1000); // Show loader for 3 seconds
      })
      .catch((error) => {
        console.error("Error fetching character details:", error);
      });
  }, [id]);

  if (isLoading) return <Loader />;

  return (
    <div className="container">
      <div className="character-detail">
        <h1 className="character_title">Detail about: {character.name}</h1>
        <img
          src={character?.image}
          alt={character?.name}
          className="character-image"
        />
        <div className="character-info">
          <p>Name: {character?.name}</p>
          <p>Status: {character?.status}</p>
          <p>Species: {character?.species}</p>
          <p>Gender: {character?.gender}</p>
          <p>Origin: {origin?.name}</p>
          <p>Origin Dimension: {origin?.dimension}</p>
          <p>Location: {location?.name}</p>
          <p>Location Type: {location?.type}</p>
          <p>Location Dimension: {location?.dimension}</p>
          <p>Residence Amount: {location?.residents?.length}</p>
          <p>Total Episodes: {episodes?.length} </p>
          <ul className="episodes-list">
            {episodes.map((episode, index) => (
              <li key={index} className="episodes-list-item">
                {episode}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CharacterDetailPage;
