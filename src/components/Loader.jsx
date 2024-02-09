// Loader.js
import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader">
        <div className="eye eye-left"></div>
        <div className="eye eye-right"></div>
        <div className="mouth"></div>
      </div>
    </div>
  );
};

export default Loader;
