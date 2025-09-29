import React from "react";

const RadioButtons = ({
  name = "radio-group",
  options = [],
  defaultValue = "",
  onChange,
}) => {
  return (
    <div className="radio-container mt-2 flex gap-4">
      {options.map((opt) => (
        <div key={opt.id} className="flex items-center">
          <input
            className="hidden peer"
            type="radio"
            id={opt.id}
            name={name}
            value={opt.value}
            defaultChecked={opt.value === defaultValue}
            onChange={(e) => onChange && onChange(e.target.value)}
          />
          <label
            htmlFor={opt.id}
            className="flex items-center cursor-pointer gap-2"
          >
            <div className="custom-radio w-5 h-5 border-2 border-gray-400 rounded-full peer-checked:border-blue-500 peer-checked:bg-blue-500 transition" />
            <span className="font-[600]">{opt.label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default RadioButtons;
