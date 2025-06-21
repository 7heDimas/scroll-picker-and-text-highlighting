import React from "react";
import { useSearchParams } from "react-router-dom";

export default function App() {
  const [searchParams] = useSearchParams();

  const date = searchParams.get("Date");
  const hour = searchParams.get("hour");
  const minute = searchParams.get("minute");
  const timeFormat = searchParams.get("AM/PM");
  return (
    <div className="app-container">
      <h1>Scroll picker and Text highlighting</h1>
      <ScrollPicker
        date={date}
        hour={hour}
        minute={minute}
        timeFormat={timeFormat}
      />
    </div>
  );
}

function ScrollPicker({date, hour, minute, timeFormat}) {
  return (
    <div className="scroll-picker-container">
      <div className="picker-row">
        <div className="picker-column">{ date }</div>
        <div className="picker-column">{ hour }</div>
        <div className="picker-column">{ minute }</div>
        <div className="picker-column">{ timeFormat }</div>
      </div>
      <button className="submit-button">Submit</button>
    </div>
  );
}

