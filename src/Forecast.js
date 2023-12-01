import React, { useEffect, useState } from "react";
import axios from "axios";
import DailyForecast from "./DailyForecast";

export default function Forecast({ coords, apiKey, showCelsius }) {
  const [forecast, setForecast] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [timezone, setTimezone] = useState(null);

  function handleResponse(response) {
    setForecast(response.data.daily);
    setTimezone(response.data.timezone_offset);
    setLoaded(true);
  }

  useEffect(() => {
    setLoaded(false);
  }, [coords, showCelsius]);

  if (loaded) {
    return (
      <div className="Forecast">
        <div className="row">
          {forecast.map((forecastData, index) => {
            if (index < 5) {
              return (
                <div className="col" key={index}>
                  <DailyForecast
                    forecastData={forecastData}
                    timezone={timezone}
                  />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  } else {
    const unit = showCelsius ? "metric" : "imperial";
    const apiForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=${unit}`;
    fetch(apiForecastUrl).then((response) => {
      if (response.ok) {
        axios.get(apiForecastUrl).then(handleResponse);
      }
    });
  }
}
