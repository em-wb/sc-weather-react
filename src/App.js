import React, { useEffect, useState } from "react";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import "./App.css";

export default function App() {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState("Bordeaux");
  const [location, setLocation] = useState({ useLocation: false });

  function getWeather(response) {
    setWeatherData({
      ready: true,
      city: response.data.name,
      date: (response.data.dt + response.data.timezone) * 1000,
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
    setLocation({
      useLocation: false,
    });
    getApiUrl();
  }

  function getApiUrl() {
    let url;
    if (location.useLocation) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=7784a4cd4aa2e0c25ead7bd96d585b8a&units=metric`;
    } else {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7784a4cd4aa2e0c25ead7bd96d585b8a&units=metric`;
    }
    fetch(url).then((response) => {
      if (response.ok) {
        axios.get(url).then(getWeather).then(console.log(weatherData));
      }
    });
  }

  function getUserLocation(e) {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition(getLatLong, error);
  }

  function getLatLong(position) {
    setLocation({
      lat: position.coords.latitude,
      long: position.coords.longitude,
      useLocation: true,
    });
  }

  useEffect(() => {
    getApiUrl();
  }, [location]);

  function error(error) {
    if (error.code) {
      alert(
        "☹️ Not found! Please check location services are enabled in your browser to use this feature."
      );
    }
  }

  if (weatherData.ready) {
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
                    <i
                      className="fa-solid fa-magnifying-glass"
                      alt="Search"
                    ></i>
                  </button>
                  <button
                    onClick={getUserLocation}
                    type="button"
                    id="current-location-btn"
                    alt="Current location"
                  >
                    <i className="fa-solid fa-location-dot"></i>
                  </button>
                </div>
              </div>
            </form>
            <CurrentWeather weatherData={weatherData} />
          </div>
          <footer>
            <a href="https://github.com/em-wb/sc-weather-react">Open source</a>{" "}
            code by Emily
          </footer>
        </div>
      </div>
    );
  } else {
    getApiUrl();
  }
}
