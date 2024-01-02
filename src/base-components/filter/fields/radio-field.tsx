import React from "react";

export const RadioField = ({
  lable,
  onChange,
  checked,
}: {
  lable: string;
  onChange: (val: string) => void;
  checked: boolean;
}) => {
  return (
    <div className="flex items-center">
      <input
        id="default-radio-1"
        type="radio"
        value={lable}
        checked={checked}
        onChange={(e) => onChange(e.currentTarget.value)}
        name="default-radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-[#BFBFBF] focus:bg-primary "
      />
      <label
        htmlFor="default-radio-1"
        className="ms-2 text-base  text-lightDark"
      >
        {lable}
      </label>
    </div>
  );
};
