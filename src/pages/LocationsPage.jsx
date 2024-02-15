import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LocationsPage.css";
import { Link } from "react-router-dom";

// Character component
const Character = ({ character }) => {
  const [characterImage, setCharacterImage] = useState("");

  useEffect(() => {
    axios
      .get(character.url)
      .then((response) => {
        // console.log("data", response.data);
        setCharacterImage(response.data);
      })
      .catch((error) => {
        console.error("Error fetching character image:", error);
      });
  }, [character.url]);

  return (
    <div className="character-card">
      {/* {console.log("char-data", character)} */}
      <Link key={characterImage.id} to={`/character/${characterImage.id}`}>
        <img
          src={characterImage.image}
          alt={character.name}
          className="eimage"
        />
        <p className="character-name">{character.name}</p>
        <p className="character-location">{character.location}</p>
      </Link>
    </div>
  );
};

// LocationsPage component
function LocationsPage() {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("1");
  const [locationInfo, setLocationInfo] = useState(null);
  const [characters, setCharacters] = useState([]);

  // Fetch locations
  useEffect(() => {
    axios
      .get(`https://rickandmortyapi.com/api/location`)
      .then((response) => {
        setLocations(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  // Fetch characters based on selected location or a default location
  useEffect(() => {
    if (selectedLocation) {
      axios
        .get(`https://rickandmortyapi.com/api/location/${selectedLocation}`)
        .then((response) => {
          setLocationInfo(response.data);
          const charactersData = response.data.residents
            .slice(0, 5)
            .map((url) => ({
              url,
              location: response.data.name,
            }));
          setCharacters(charactersData);
        })
        .catch((error) => {
          console.error("Error fetching characters:", error);
        });
    }
  }, [selectedLocation]);

  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <div className="main_container">
      <div className="container-inner">
        <h1 className="main_title">Locations</h1>

        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">Select a location</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.name}
            </option>
          ))}
        </select>

        {!locationInfo && (
          <div className="location-info">
            <h2>Earth (Replacement Dimension)</h2>
            <p>Dimension: Replacement Dimension</p>
            <p>Type: Planet</p>
          </div>
        )}
      </div>
      <div>
        {locationInfo && (
          <div className="location-info">
            <h3>{locationInfo.name}</h3>
            <p>Dimension: {locationInfo.dimension}</p>
            <p>Type: {locationInfo.type}</p>
          </div>
        )}
      </div>
      <div className="character-container">
        {characters.map((character, index) => (
          <Character key={index} character={character} />
        ))}
      </div>
    </div>
  );
}

export default LocationsPage;
