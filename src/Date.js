import React from "react";

export default function Date({ dateData }) {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // const day = days[dateData.getDay()];

  return (
    <span id="current-day-time">
      {/* {day} · {hours}:{minutes} */}
      hello
    </span>
  );
}
