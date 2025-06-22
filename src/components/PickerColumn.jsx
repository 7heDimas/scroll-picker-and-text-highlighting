import React, { useRef, useEffect } from 'react';

function PickerColumn({ items, selected, onSelect }) {
    const itemRefs = useRef([]);
  
    useEffect(() => {
      const index = items.findIndex((item) => item === selected);
      if (index !== -1 && itemRefs.current[index]) {
        itemRefs.current[index].scrollIntoView({
          behavior: "smooth",
          block: "center"
        });
      }
    }, [selected, items]);
  
return (
  <div className="picker-column">
    <div style={{ height: "80px" }}></div>

    {items.map((item, index) => (
      <div
        key={item}
        ref={(el) => (itemRefs.current[index] = el)}
        className={`picker-item ${item === selected ? "active" : ""}`}
        onClick={() => onSelect(item)}
      >
        {item}
      </div>
    ))}

    <div style={{ height: "80px" }}></div>
  </div>
);
}

export default PickerColumn;