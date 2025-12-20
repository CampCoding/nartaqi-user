"use  client";

import { useState } from "react";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";

export function MyDatePicker({ selected, onSelect, onClose }) {
  const [internalSelected, setInternalSelected] = useState(selected);

  const handleSelect = (date) => {
    setInternalSelected(date);
    if (onSelect) {
      onSelect(date);
    }
    // Close dropdown after selection
    if (onClose) {
      setTimeout(() => onClose(), 100);
    }
  };

  return (
    <div className="p-2">
      <DayPicker
      dir="ltr"
      lang="en"
        mode="single"
        selected={internalSelected}
        onSelect={handleSelect}
        footer={
          internalSelected ? `Selected: ${internalSelected.toLocaleDateString()}` : "Pick a day."
        }
      />
    </div>
  );
}
