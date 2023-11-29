import React, { useState } from "react";
import axios from "axios";
import Date from "./Date";
import "./App.css";

export default function App() {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState("Bordeaux");

  function getWeather(response) {
    setWeatherData({
      ready: true,
      city: response.data.name,
      date: new Date(response.data.dt * 1000),
      temp: Math.round(response.data.main.temp),
      desc: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed * 3.6),
      imgId: response.data.weather[0].icon,
    });
  }

  let getInput = (e) => setCity(e.target.value);

  function handleSumbit(e) {
    e.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3a94f3778290bfeee61278505dbbe51d&units=metric`;
    fetch(url).then((response) => {
      if (response.ok) {
        axios.get(url).then(getWeather).then(console.log(weatherData));
      }
    });
  }

  return (
    <div className="App">
      <div className="container">
        <div className="app-ctr dark-light">
          <form
            onSubmit={handleSumbit}
            id="search-cities"
            className="row search-ctr"
            action=""
          >
            <div className="col d-flex">
              <div className="col-10">
                <input
                  onChange={getInput}
                  id="new-city"
                  type="text"
                  placeholder="Enter a city"
                />
              </div>
              <div className="btn-ctr d-flex col-md-2">
                <button type="submit">
                  <i className="fa-solid fa-magnifying-glass" alt="Search"></i>
                </button>
                <button
                  type="button"
                  id="current-location-btn"
                  alt="Current location"
                >
                  <i className="fa-solid fa-location-dot"></i>
                </button>
              </div>
            </div>
          </form>
          <div className="row current-ctr mt-2">
            <h1 className="col-sm-4 current city-cell" id="current-city">
              {weatherData.city}
            </h1>
            <div className="col-sm-4 col-5 current icon-cell pb-3 text-center">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.imgId}@2x.png`}
                alt={weatherData.desc}
                id="current-icon"
              />
            </div>
            <h2 className="col-sm-4 col-7 current temp-cell text-center">
              <strong>
                <span id="current-temp-value">{weatherData.temp}</span>°
                <small>
                  <a
                    href="/"
                    id="degrees-c"
                    className="unhidden dark-light metric"
                  >
                    C{" "}
                  </a>
                  |{" "}
                  <a
                    href="/"
                    id="degrees-f"
                    className="hidden dark-light metric"
                  >
                    F
                  </a>
                </small>
              </strong>
            </h2>
          </div>
          <div className="row">
            <div className="col-md-12 current">
              {weatherData.date}
              <Date dateData={weatherData.date} /> ·
              <span className="description" id="current-description">
                {" "}
                {weatherData.desc}
              </span>
              <div>
                Humidity <span id="current-humidity"></span>
                {weatherData.humidity}% · Wind {weatherData.wind}km/h
                <span id="current-wind"></span>
              </div>
            </div>
          </div>
        </div>

        <footer>
          <a href="https://github.com/em-wb/sc-weather-react">Open source</a>{" "}
          code by Emily
        </footer>
      </div>
    </div>
  );
}
