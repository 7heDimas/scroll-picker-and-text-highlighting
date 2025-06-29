import React, { useRef, useEffect, useState } from "react";

function PickerColumn({ items, selected, onSelect }) {
  const itemRefs = useRef([]);
  const containerRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const dragStartY = useRef(0);
  const scrollStartTop = useRef(0);

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

  const onStart = (clientY) => {
    setIsDragging(true);
    dragStartY.current = clientY;
    scrollStartTop.current = containerRef.current.scrollTop;
  };

  const onMove = (clientY) => {
    if (!isDragging) return;
    const deltaY = dragStartY.current - clientY;
    containerRef.current.scrollTop = scrollStartTop.current + deltaY;
  };

  const onEnd = () => {
    setIsDragging(false);
    containerRef.current.dispatchEvent(new Event("scroll"));
  };

  const handleMouseDown = (e) => onStart(e.clientY);
  const handleMouseMove = (e) => onMove(e.clientY);
  const handleMouseUp = () => onEnd();

  const handleTouchStart = (e) => onStart(e.touches[0].clientY);
  const handleTouchMove = (e) => onMove(e.touches[0].clientY);
  const handleTouchEnd = () => onEnd();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isDragging]);

  return (
    <div
      className="picker-column"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
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
