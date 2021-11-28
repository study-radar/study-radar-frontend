import React from "react";

export default function AgendaItem(props) {
  // Props should have date_time
  // Props should have name

  function displayTime(dateTimeString) {
    const timeString = dateTimeString.split("T")[1];
    const splitTimeString = timeString.split(":").map((time) => parseInt(time));
    const ampm = splitTimeString[0] >= 12 ? "PM" : "AM";
    let hourString = "0";
    if (splitTimeString[0] === 0) {
      hourString = "12";
    } else if (splitTimeString[0] === 12) {
      hourString = "12";
    } else {
      const hour =
        splitTimeString[0] >= 12 ? splitTimeString[0] - 12 : splitTimeString[0];
      hourString = hour.toString();
    }
    return `${hourString}:${String(splitTimeString[1]).padStart(
      2,
      "0"
    )} ${ampm}`;
  }
  return (
    <div>
      <p className="text-2xl">{displayTime(props.date_time)}</p>
      <p className="text-3xl">{props.name}</p>
    </div>
  );
}
