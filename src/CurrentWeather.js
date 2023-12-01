import React, { useEffect, useState } from "react";
import FormatDate from "./FormatDate";
import WeatherIcons from "./WeatherIcons";
import Forecast from "./Forecast";

export default function CurrentWeather({ weatherData, apiKey }) {
  const [tempChosen, setTempChosen] = useState(weatherData.temp);
  const [showCelsius, setShowCelsius] = useState(true);
  const dayNight = weatherData.imgId.includes("d") ? "day" : "night";
  const styleC = showCelsius ? "unhidden" : "hidden";
  const styleF = showCelsius ? "hidden" : "unhidden";

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
        <div className={`${dayNight} col-sm-3 col-5 current pt-2 text-end`}>
          <WeatherIcons imgId={weatherData.imgId} />
        </div>
        <h2 className="col-sm-3 col-7 current text-center">
          <strong>
            <span>{Math.round(tempChosen)}</span>°{" "}
            <div className="degrees-ctr">
              <small>
                <a
                  onClick={changeTempC}
                  href="/"
                  className={`${styleC} ${dayNight}`}
                >
                  C
                </a>{" "}
                |{" "}
                <a
                  onClick={changeTempF}
                  href="/"
                  className={`${styleF} ${dayNight}`}
                >
                  F
                </a>
              </small>
            </div>
          </strong>
        </h2>
      </div>
      <div className="row">
        <div className="col-md-12 mt-4 current">
          <FormatDate dateData={weatherData.date} /> ·
          <span className="description"> {weatherData.desc}</span>
          <div>
            Humidity <span></span>
            {weatherData.humidity}% · Wind {weatherData.wind}km/h
          </div>
        </div>
      </div>
      <Forecast
        coords={weatherData.coords}
        apiKey={apiKey}
        showCelsius={showCelsius}
      />
    </div>
  );
}
