import React from "react";
import { useSearchParams } from "react-router-dom";
import ScrollPicker from "./components/ScrollPicker";
import TextHighlighter from "./components/TextHighlighter";

export default function App() {
  const [searchParams] = useSearchParams();

  const dateParam = searchParams.get("date");
  let date = "Today";
  let hour = 4;
  let minute = 20;
  let format = "AM";

  if (dateParam) {
    const parsed = new Date(dateParam);
    if (!isNaN(parsed)) {
      const today = new Date();
      const isToday =
        parsed.getFullYear() === today.getFullYear() &&
        parsed.getMonth() === today.getMonth() &&
        parsed.getDate() === today.getDate();
  
      date = isToday
        ? "Today"
        : parsed.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
          });
  
      let rawHour = parsed.getHours();
      format = rawHour >= 12 ? "PM" : "AM";
      hour = rawHour % 12 || 12;
      minute = Math.round(parsed.getMinutes() / 5) * 5;
    }
  }

  const handleChange = (selectedDate, selectedHour, selectedMinute, selectedFormat) => {
    console.log("Selected Date: ", selectedDate);
    console.log(`Selected Time: ${selectedHour}:${selectedMinute < 10 ? "0" + selectedMinute : selectedMinute} ${selectedFormat}`);
  }
  
  return (
    <div className="app-container">
      <h1 className="header-text">Scroll picker and Text highlighting</h1>
      <ScrollPicker
        date={date}
        hour={hour}
        minute={minute}
        timeFormat={format}
        onChange={handleChange}
      />
      <TextHighlighter />
    </div>

  );
}
