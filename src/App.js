import React from "react";
// import axios from "axios";
import "./App.css";

export default function App() {
  let weatherData = {
    city: "London",
    temperature: 22,
    date: "Monday 12:00",
    description: "Cloudy",
    imgUrl: "https://openweathermap.org/img/wn/03d@2x.png",
    humidity: 10,
    wind: 15,
  };

  return (
    <div className="App">
      <div className="container">
        <div className="app-ctr dark-light">
          <form id="search-cities" class="row search-ctr" action="">
            <div class="col d-flex">
              <div class="col-10">
                <input id="new-city" type="text" placeholder="Enter a city" />
              </div>
              <div class="btn-ctr d-flex col-md-2">
                <button type="submit">
                  <i class="fa-solid fa-magnifying-glass" alt="Search"></i>
                </button>
                <button
                  type="button"
                  id="current-location-btn"
                  alt="Current location"
                >
                  <i class="fa-solid fa-location-dot"></i>
                </button>
              </div>
            </div>
          </form>
          <div class="row current-ctr mt-2">
            <h1 class="col-sm-4 current city-cell" id="current-city">
              {weatherData.city}
            </h1>
            <div class="col-sm-4 col-5 current icon-cell pb-3 text-center">
              <img src={weatherData.imgUrl} alt="" id="current-icon" />
            </div>
            <h2 class="col-sm-4 col-7 current temp-cell text-center">
              <strong>
                <span id="current-temp-value">{weatherData.temperature}</span>°
                <small>
                  <a href="" id="degrees-c" class="unhidden dark-light metric">
                    C{" "}
                  </a>
                  |{" "}
                  <a href="" id="degrees-f" class="hidden dark-light metric">
                    F
                  </a>
                </small>
              </strong>
            </h2>
          </div>
          <div class="row">
            <div class="col-md-12 current">
              <span id="current-day-time">{weatherData.date}</span> ·
              <span class="description" id="current-description">
                {" "}
                {weatherData.description}
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
