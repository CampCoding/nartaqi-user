import React, { useId } from "react";

const CheckboxButton = ({ id, className = "", ...props }) => {
  const autoId = useId();
  const inputId = id || `cb-${autoId}`;

  return (
    <div className={`checkbox-wrapper-19 ${className}`}>
      <input id={inputId} type="checkbox" {...props} />
      <label className="check-box" htmlFor={inputId}></label>
    </div>
  );
};

export default CheckboxButton;
