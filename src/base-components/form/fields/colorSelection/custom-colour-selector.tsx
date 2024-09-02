import { ColourSelectProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import { useEffect, useState } from "react";

export const CustomColorSelectionField = ({
  options,
  id,
  name,
  value,
  containerClassName,
  trigger,
  onChange,
}: ColourSelectProps) => {
  const [selectedColor, setSelectedColor] = useState(value || "");

  useEffect(() => {
    if (value) {
      setSelectedColor(value);
    }
  }, [value]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
    if (onChange) {
      onChange(color);
    }
    if (trigger) {
      trigger(name);
    }
  };

  return (
    <div
      className="flex items-center justify-between xMini:gap-x-[6px]"
      id={id}
    >
      {options?.map((color, index) => {
        const isSelected = color === selectedColor;

        const buttonClasses = combineClasses(
          "rounded-full",
          containerClassName
        );

        return (
          <div
            key={index}
            className={`flex items-center justify-center ${
              isSelected ? "p-1 rounded-2xl border-2" : ""
            }`}
            style={{
              borderColor: isSelected ? color : "transparent",
            }}
          >
            <span
              key={color}
              style={{
                backgroundColor: color,
                cursor: "pointer",
              }}
              className={`${
                isSelected
                  ? "w-[14px] h-[14px] xMini:w-4 xMini:h-4"
                  : "w-[20px] h-[20px] xMini:w-[26px] xMini:h-[26px]"
              } ${buttonClasses}`}
              onClick={() => handleColorSelect(color)}
            />
          </div>
        );
      })}
      <input type="hidden" name={name} value={selectedColor} />
    </div>
  );
};
