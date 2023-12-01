import React, { useEffect, useState } from "react";
import axios from "axios";
import CurrentWeather from "./CurrentWeather";
import "./App.css";

export default function App() {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState("Bordeaux");
  const [location, setLocation] = useState({ useLocation: false });
  const apiKey = "8ca7dd4e61360b90fb66918853670e48";

  function getWeather(response) {
    setWeatherData({
      ready: true,
      city: response.data.name,
      coords: response.data.coord,
      date: (response.data.dt + response.data.timezone) * 1000,
      temp: response.data.main.temp,
      desc: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: Math.round(response.data.wind.speed * 3.6),
      imgId: response.data.weather[0].icon,
    });
  }

  function handleSumbit(e) {
    e.preventDefault();
    setLocation({
      useLocation: false,
    });
    getApiByCity();
    setCity("");
  }

  function getApiByCity() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url).then((response) => {
      if (response.ok) {
        axios.get(url).then(getWeather);
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
    });
  }

  useEffect(() => {
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.long}&appid=${apiKey}&units=metric`;
    fetch(url).then((response) => {
      if (response.ok) {
        axios.get(url).then(getWeather);
      }
    });
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
          <div
            className={`${
              weatherData.imgId.includes("d") ? "day app-ctr" : "night app-ctr"
            }`}
          >
            <form onSubmit={handleSumbit} className="row" action="">
              <div className="col d-flex">
                <div className="col-10">
                  <input
                    onChange={(e) => setCity(e.target.value)}
                    id="new-city"
                    type="text"
                    placeholder="Enter a city"
                    value={city}
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
                    alt="Current location"
                  >
                    <i className="fa-solid fa-location-dot"></i>
                  </button>
                </div>
              </div>
            </form>
            <CurrentWeather weatherData={weatherData} apiKey={apiKey} />
          </div>
          <footer className="mt-1">
            <a href="https://github.com/em-wb/sc-weather-react">Open source</a>{" "}
            code by Emily
          </footer>
        </div>
      </div>
    );
  } else {
    getApiByCity();
  }
}
