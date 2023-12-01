import React, { useEffect, useState } from "react";
import FormatDate from "./FormatDate";
import WeatherIcons from "./WeatherIcons";

export default function CurrentWeather({ weatherData }) {
  const [tempChosen, setTempChosen] = useState(weatherData.temp);
  const [showCelsius, setShowCelsius] = useState(true);

  useEffect(() => {
    if (showCelsius) {
      setTempChosen(weatherData.temp);
    } else {
      setTempChosen((weatherData.temp * 9) / 5 + 32);
    }
  }, [showCelsius, weatherData.temp]);

  function changeTempC(e) {
    e.preventDefault();
    setShowCelsius(true);
  }

  function changeTempF(e) {
    e.preventDefault();
    setShowCelsius(false);
  }

  return (
    <div className="currentWeather">
      <div className="row current-ctr mt-4">
        <h1 className="col-sm-6 current city-cell" id="current-city">
          {weatherData.city}
        </h1>
        <div
          className="col-sm-3 col-5 current icon-cell pt-2 text-end
        "
        >
          <WeatherIcons className="currentIcon" imgId={weatherData.imgId} />
        </div>
        <h2 className="col-sm-3 col-7 current temp-cell text-center">
          <strong>
            <span id="current-temp-value">{Math.round(tempChosen)}</span>°
            <small>
              <a
                onClick={changeTempC}
                href="/"
                id="degrees-c"
                className={`${showCelsius ? "unhidden" : "hidden"}`}
              >
                C
              </a>{" "}
              |{" "}
              <a
                onClick={changeTempF}
                href="/"
                id="degrees-f"
                className={`${showCelsius ? "hidden" : "unhidden"}`}
              >
                F
              </a>
            </small>
          </strong>
        </h2>
      </div>
      <div className="row">
        <div className="col-md-12 mt-4 current">
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
