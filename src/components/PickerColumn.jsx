import React, { useRef, useEffect } from "react";

function PickerColumn({ items, selected, onSelect }) {
  const itemRefs = useRef([]);
  const containerRef = useRef(null);


  useEffect(() => {
    const index = items.findIndex((item) => item === selected);
    if (index !== -1 && itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [selected, items]);


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let timeout;
    const handleScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const containerRect = container.getBoundingClientRect();
        const centerY = containerRect.top + containerRect.height / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        itemRefs.current.forEach((el, index) => {
          if (!el) return;
          const rect = el.getBoundingClientRect();
          const elCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elCenter - centerY);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        });

        const newItem = items[closestIndex];
        if (newItem !== selected) {
          onSelect(newItem);
        }
      }, 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [items, selected, onSelect]);

  return (
    <div className="picker-column" ref={containerRef}>
      <div style={{ height: "80px" }}></div>

      {items.map((item, index) => (
        <div
          key={`${item}-${index}`}
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