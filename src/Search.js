import React, { useState } from "react";
import Weather from "./Weather";
import axios from "axios";
import "./Style.css";

export default function Search() {
  const [city, setCity] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [desc, setDesc] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);
  const [imgId, setImgId] = useState(null);

  const weatherData = [temperature, desc, humidity, wind, imgId];

  function getWeather(response) {
    setTemperature(`It's ${Math.round(response.data.main.temp)}°c in ${city}`);
    setDesc(response.data.weather[0].description);
    setHumidity(`Humidity: ${response.data.main.humidity}%`);
    setWind(`Wind: ${Math.round(response.data.wind.speed)} mtr/sec`);
    setImgId(
      <img
        src={`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`}
        alt="Weather Icon"
      />
    );
  }

  let getInput = (e) => setCity(e.target.value);

  function handleSumbit(e) {
    e.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a94f3778290bfeee61278505dbbe51d&units=metric`;
    fetch(url).then((response) => {
      if (response.ok) {
        axios.get(url).then(getWeather);
      }
    });
  }

  return (
    <div className="Search">
      <h1>Weather App</h1>
      <form onSubmit={handleSumbit}>
        <input
          type="search"
          placeholder="enter a city"
          onChange={getInput}
        ></input>
        <input type="submit"></input>
        <Weather weatherData={weatherData} />
      </form>
    </div>
  );
}
