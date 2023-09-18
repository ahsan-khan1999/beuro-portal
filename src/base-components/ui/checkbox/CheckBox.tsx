import React from "react";

const CheckBox = ({ label }: any) => {
  return (
    <label className="checkbox-container text-sm text-dark">
      <div className="relative mr-2">
        <input
          type="checkbox"
          name="checkbox"
          className="absolute left-0 w-[15px] h-[15px] z-50"
        />
        <span className="checkbox-checkmark" />
      </div>
      {label}
    </label>
  );
};

export default CheckBox;
