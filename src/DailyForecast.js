import React from "react";
import WeatherIcons from "./WeatherIcons";

export default function DailyForecast({ forecastData, timezone }) {
  const description = forecastData.weather[0].description;
  const minTemp = Math.round(forecastData.temp.min);
  const maxTemp = Math.round(forecastData.temp.max);
  const imgId = forecastData.weather[0].icon;

  function getDay() {
    const date = new Date((forecastData.dt + timezone) * 1000);
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day = days[date.getUTCDay()];
    console.log(date, "date");
    return day;
  }

  return (
    <div className="DailyForecast">
      <div className="row">
        <div className="col forecastCtr text-center mt-4">
          <div className="mb-2">{getDay()}</div>
          <div className="mb-2">
            <WeatherIcons imgId={imgId} />
          </div>

          <div className="description forecastDesc mb-2">
            <small>{description}</small>
          </div>
          <div className="mb-2">
            <strong>{maxTemp}°</strong> · {minTemp}°
          </div>
        </div>
      </div>
    </div>
  );
}
