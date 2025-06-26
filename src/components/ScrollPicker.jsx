import React, { useState } from "react";
import PickerColumn from "./PickerColumn";

function ScrollPicker({ date, hour, minute, timeFormat, onChange }) {
    const dates = Array.from({ length: 60 }, (_, i) => {
        if (i === 0) return "Today";
      
        const nextDate = new Date();
        nextDate.setDate(nextDate.getDate() + i);
      
        return nextDate.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "2-digit",
        });
    });
    
    const hours = Array.from({ length: 12 }, (_, i) => i + 1)
    const minutes = Array.from({ length: 12 }, (_, i) => i * 5)
    const formats = ["AM", "PM"]

    const [selectedDate, setSelectedDate] = useState(date || "Today");
    const [selectedHour, setSelectedHour] = useState(Number(hour) || 4);
    const [selectedMinute, setSelectedMinute] = useState(Number(minute) || 20);
    const [selectedFormat, setSelectedFormat] = useState(timeFormat || "AM");
  
  
    return (
    <div className="scroll-picker-container">
      <div className="picker-overlay"></div>
      <div className="picker-highlight"></div>
      <div className="picker-row">
        <PickerColumn items={dates} selected={selectedDate} onSelect={setSelectedDate} />
        <PickerColumn items={hours} selected={selectedHour} onSelect={setSelectedHour} />
        <PickerColumn items={minutes} selected={selectedMinute} onSelect={setSelectedMinute} />
        <PickerColumn items={formats} selected={selectedFormat} onSelect={setSelectedFormat} />
      </div>
  
        <button className="submit-button" onClick={() => {
          if (onChange) {
            onChange(selectedDate, selectedHour, selectedMinute, selectedFormat);
          }
        }}>
          Submit
        </button>
    </div>
  );
}

export default ScrollPicker;