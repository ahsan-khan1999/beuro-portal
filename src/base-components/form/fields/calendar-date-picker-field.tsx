import { CalendarDatePickerProps } from "@/types";
import moment from "moment";
import { useState, useRef, useEffect } from "react";

export const CalendarDatePickerField = ({
  id,
  name,
  register,
  value,
  className,
  svg,
  dateType = "datetime-local",
  min,
  max,
  disable,
  setValue,
}: CalendarDatePickerProps) => {
  const [formattedDate, setFormattedDate] = useState(
    value
      ? moment(value).format(
          dateType === "datetime-local" ? "YYYY-MM-DDTHH:mm" : "YYYY-MM-DD"
        )
      : ""
  );

  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setFormattedDate(
        moment(value).format(
          dateType === "datetime-local" ? "YYYY-MM-DDTHH:mm" : "YYYY-MM-DD"
        )
      );
    }
  }, [value]);

  const handleOpenDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormattedDate(value);
    setValue(name, value);
  };

  return (
    <div
      className="flex items-center gap-x-2 p-[10px]"
      onClick={handleOpenDatePicker}
    >
      {svg && (
        <span
          className="cursor-pointer"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      )}

      <div className="flex flex-col gap-y-1">
        <span className="text-xs text-[#7A7A7A] font-medium">
          {formattedDate
            ? moment(formattedDate).format("ddd, MMM D")
            : "Select Date"}
        </span>
        {dateType === "datetime-local" && (
          <span className="text-sm font-medium text-[#3C3C3C]">
            {formattedDate ? moment(formattedDate).format("HH:mm") : ""}
          </span>
        )}
      </div>

      <input
        type={dateType}
        value={formattedDate}
        id={id}
        {...register(name)}
        min={min}
        max={max}
        disabled={disable}
        className="absolute opacity-0 w-0 h-0"
        onChange={handleDateChange}
        ref={dateInputRef}
      />
    </div>
  );
};
