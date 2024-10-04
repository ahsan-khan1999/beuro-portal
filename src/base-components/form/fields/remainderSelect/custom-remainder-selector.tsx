import { RemainderSelectProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import { useState } from "react";

export const CustomColorSelectionField = ({
  options,
  id,
  name,
  value,
  containerClassName,
  eventClassName,
  trigger,
  onChange,
}: RemainderSelectProps) => {
  const [selectedTime, setSelectedTime] = useState(value || 0);

  const handleColorSelect = (value: number) => {
    setSelectedTime(value);
    if (onChange) {
      onChange(value);
    }
    if (trigger) {
      trigger(name);
    }
  };

  const rows = [];
  for (let i = 0; i < options?.length; i += 3) {
    rows?.push(options?.slice(i, i + 3));
  }

  const formatTime = (value: number) => {
    if (value === 60) return "1";
    if (value === 120) return "2";
    if (value === 1440) return "1";
    if (value === 2880) return "2";
    if (value === 10080) return "7";
    return `${value}`;
  };

  return (
    <div id={id}>
      {rows?.map((row, rowIndex) => {
        const isLastRow = rowIndex === rows?.length - 1;
        const rowClasses = combineClasses(
          `grid grid-cols-3 items-center gap-y-[10px] py-[10px] ${
            !isLastRow && "border-b border-b-[#000] border-opacity-30"
          }`,
          containerClassName
        );

        return (
          <div className={rowClasses} key={rowIndex}>
            {row?.map((item, index) => {
              const isSelected = selectedTime === item?.value;

              const eventSelectClasses = combineClasses(
                `p-1 cursor-pointer flex flex-col items-center gap-y-1 border-r border-r-[#000] border-opacity-30 ${
                  index === row?.length - 1 && "border-r-0"
                } ${isSelected ? "bg-primary text-white" : "bg-transparent"}`,
                eventClassName
              );

              return (
                <div
                  className={eventSelectClasses}
                  key={index}
                  onClick={() => handleColorSelect(item?.value)}
                >
                  <span
                    className={`text-sm font-medium ${
                      isSelected ? "text-white" : "text-[#616161]"
                    }`}
                  >
                    {formatTime(item?.value)}
                  </span>
                  <span
                    className={`text-sm font-medium text-[#3C3C3C] ${
                      isSelected ? "text-white" : "text-[#616161]"
                    }`}
                  >
                    {item?.label}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}
      <input type="hidden" name={name} value={selectedTime} />
    </div>
  );
};
