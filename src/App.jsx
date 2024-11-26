import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [character, setCharacter] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!search) return;
    setError("");
    setCharacter(null);

    try {
      let response;
      if (!isNaN(search)) {
        response = await axios.get(`https://rickandmortyapi.com/api/character/${search}`);
      } else {
        response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${search}`);
        response = response.data.results[0];
      }
      setCharacter(response.data || response);
    } catch (err) {
      setError("No se encontró el personaje. Intenta con otro ID o nombre.");
    }
  };

  const handleReset = () => {
    setSearch("");
    setCharacter(null);
    setError("");
  };

  return (
    <div className="app-container">
      {!character && (
        <div className="centered-card">
          <h1>Busca un Personaje</h1>
          <input
            type="text"
            placeholder="ID o Nombre del personaje"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Buscar</button>
          {error && <p className="error">{error}</p>}
        </div>
      )}

      {/* Tarjetas de resultado */}
      {character && (
        <div className="result-container">
          {/* Tarjeta izquierda */}
          <div className="info-card">
            <h2>Información del Personaje</h2>
            <p><strong>Nombre:</strong> {character.name}</p>
            <p><strong>Estado:</strong> {character.status}</p>
            <p><strong>Especie:</strong> {character.species}</p>
            <p><strong>Origen:</strong> {character.origin.name}</p>
          </div>

          {/* Tarjeta derecha */}
          <div className="image-card">
            <img src={character.image} alt={character.name} />
          </div>

          {/* Botón Atrás */}
          <button className="back-button" onClick={handleReset}>Atrás</button>
        </div>
      )}
    </div>
  );
};

export default App;