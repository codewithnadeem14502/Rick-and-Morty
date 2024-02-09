import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CharactersPage from "./pages/CharactersPage";
import CharacterDetailPage from "./pages/CharacterDetailPage";
import LocationsPage from "./pages/LocationsPage";
import EpisodesPage from "./pages/EpisodesPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<CharactersPage />} />
          <Route path="/character/:id" element={<CharacterDetailPage />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
