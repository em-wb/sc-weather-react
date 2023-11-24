import React from "react";
import "./Style.css";

export default function Weather({ weatherData }) {
  if (weatherData) {
    return (
      <div>
        <ul className="weatherList">
          {weatherData.map((weatherData, index) => {
            return <li key={index}>{weatherData}</li>;
          })}
        </ul>
      </div>
    );
  }
}
