import { CalendarDatePickerProps } from "@/types";
import { formatDateString } from "@/utils/functions";
import { combineClasses } from "@/utils/utility";
import { useState, useRef } from "react";

export const CalendarDatePickerField = ({
  id,
  name,
  register,
  value,
  className,
  svg,
  dateType,
  min,
  max,
  disable,
  setValue,
}: CalendarDatePickerProps) => {
  const [formattedDate, setFormattedDate] = useState(
    value ? formatDateString(value) : ""
  );

  console.log(value, "value");

  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleOpenDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const defaultClasses = `flex items-center gap-x-2 p-[10px]`;
  const defaultInputClasses = combineClasses(
    "absolute opacity-0 w-0 h-0",
    className
  );

  const formatDateTime = (value: string) => {
    const date = new Date(value);

    if (isNaN(date.getTime())) {
      return { formattedDate: "", formattedTime: "" };
    }

    const formattedDate = date.toLocaleDateString(undefined, {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return { formattedDate, formattedTime };
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const { formattedDate, formattedTime } = formatDateTime(value);
    setFormattedDate(`${formattedDate} ${formattedTime}`);
    setValue(name, e.target.value);
    // register(name).onChange(e);
  };

  const { formattedDate: displayDate, formattedTime: displayTime } =
    formattedDate
      ? formatDateTime(formattedDate)
      : { formattedDate: "", formattedTime: "" };

  console.log(displayDate);

  return (
    <div className={defaultClasses} onClick={handleOpenDatePicker}>
      {svg && (
        <span
          className="cursor-pointer"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}

      <div className="flex flex-col gap-y-1">
        <span className="text-xs text-[#7A7A7A] font-medium">
          {displayDate || "Select Date"}
        </span>
        <span className="text-sm font-medium text-[#3C3C3C]">
          {displayTime || ""}
        </span>
      </div>

      <input
        type={dateType}
        defaultValue={value && formatDateString(value)}
        id={id}
        {...register(name)}
        min={min}
        max={max}
        disabled={disable}
        className={defaultInputClasses}
        onChange={handleDateChange}
        ref={dateInputRef}
      />
    </div>
  );
};
