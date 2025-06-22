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

function ScrollPicker({ date, hour, minute, timeFormat }) {
  const dates = Array.from({ length: 60 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);

      if (i === 0) return "today";
  
      return date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
      });

  });
  const hours = Array.from({ length: 12 }, (_, i) => i + 1)
  const minutes = Array.from({ length: 13 }, (_, i) => i * 5)
  const formats = ["AM", "PM"]
  return (
    <div className="scroll-picker-container">
      <div className="picker-row">
        <div className="picker-column">
          {dates.map((d) => (
            <div key={d} className={`picker-item ${date === d ? 'active' : ''}`}>
              {d}
            </div>
          ))}
        </div>
        <div className="picker-column">
          {hours.map((h) => (
            <div key={h} className={`picker-item ${Number(hour) === h ? 'active' : ''}`}>
              {h}
          </div>
          ))}
        </div>
        <div className="picker-column">
          {minutes.map((m) => (
            <div key={m} className={`picker-item ${Number(minute) === m ? 'active' : ''}`}>
              {m}
            </div>
          ))}</div>
        <div className="picker-column">
          {formats.map((f) => 
            <div key={f} className={`picker-item ${timeFormat === f ? 'active' : ''}`}>
              {f}
            </div>
          )}</div>
      </div>
      <button className="submit-button">Submit</button>
    </div>
  );
}

