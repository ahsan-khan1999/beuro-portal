import React from "react";

const RadioButton = ({ label, checked, radioMargin }: any) => {
  return (
    <label className="radio-container">
      <div className={`relative mr-2 ${radioMargin}`}>
        <input
          type="radio"
          checked={checked}
          name="radio"
          className="absolute left-0 w-5 h-5 z-50"
        />
        <span className="checkmark" />
      </div>
      {label}
    </label>
  );
};

export default RadioButton;
