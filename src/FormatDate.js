import React from "react";

export default function FormatDate({ dateData }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date(dateData);
  const day = days[date.getUTCDay()];
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return (
    <span id="current-day-time">
      {day} {hours}:{minutes}
    </span>
  );
}
