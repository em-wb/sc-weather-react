import React from "react";
import FormatDate from "./FormatDate";

export default function CurrentWeather({ weatherData }) {
  return (
    <div className="currentWeather">
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
              <a href="/" id="degrees-c" className="unhidden dark-light metric">
                C{" "}
              </a>
              |{" "}
              <a href="/" id="degrees-f" className="hidden dark-light metric">
                F
              </a>
            </small>
          </strong>
        </h2>
      </div>
      <div className="row">
        <div className="col-md-12 current">
          <FormatDate dateData={weatherData.date} /> ·
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
  );
}
