import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import ScrollPicker from "./components/ScrollPicker";

export default function App() {
  const [searchParams] = useSearchParams();

  const date = searchParams.get("Date");
  const hour = searchParams.get("hour");
  const minute = searchParams.get("minute");
  const timeFormat = searchParams.get("AM/PM");

  const handleChange = (selectedDate, selectedHour, selectedMinute, selectedFormat) => {
  console.log("Selected Date: ", selectedDate);
  console.log("Selected Time: ", selectedHour + ":" + (selectedMinute < 10 ? "0" + selectedMinute : selectedMinute) + " " + selectedFormat);
  }
  
  return (
    <div className="app-container">
      <h1 className="header-text">Scroll picker and Text highlighting</h1>
      <ScrollPicker
        date={date}
        hour={hour}
        minute={minute}
        timeFormat={timeFormat}
        onChange={handleChange}
      />
    </div>
  );
}
