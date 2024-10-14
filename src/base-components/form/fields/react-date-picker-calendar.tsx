import { CalendarDatePickerProps } from "@/types";
import moment from "moment";
import { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = forwardRef(
  (
    {
      value,
      onClick,
      svg,
    }: { value: string; onClick?: () => void; svg?: string },
    ref
  ) => (
    <div
      className="flex items-center gap-x-2 p-[10px]"
      onClick={onClick}
      ref={ref as React.Ref<HTMLDivElement>}
    >
      <span className="cursor-pointer">
        {svg && (
          <span
            className="cursor-pointer"
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}
      </span>

      <div className="flex flex-col gap-y-1">
        <span className="text-xs text-[#7A7A7A] font-medium cursor-pointer">
          {value ? moment(value).format("ddd, MMM D") : "Select Date"}
        </span>
        <span className="text-sm font-medium text-[#3C3C3C] cursor-pointer">
          {value ? moment(value).format("HH:mm") : ""}
        </span>
      </div>
    </div>
  )
);

export const CalendarDatePickerField = ({
  id,
  name,
  value,
  svg,
  dateType = "datetime-local",
  disable,
  setValue,
  watch,
  onDateChange,
}: CalendarDatePickerProps) => {
  const [formattedDate, setFormattedDate] = useState(
    value
      ? moment(value).format(
          dateType === "datetime-local" ? "YYYY-MM-DDTHH:mm" : "YYYY-MM-DD"
        )
      : ""
  );

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value ? new Date(value) : null
  );

  const inputVal = watch(name);

  useEffect(() => {
    if (inputVal !== formattedDate) {
      setFormattedDate(inputVal);
    }
  }, [inputVal, formattedDate]);

  useEffect(() => {
    if (value) {
      setSelectedDate(new Date(value));
      setFormattedDate(
        moment(value).format(
          dateType === "datetime-local" ? "YYYY-MM-DDTHH:mm" : "YYYY-MM-DD"
        )
      );
    }
  }, [value]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const formatted = moment(date).format(
        dateType === "datetime-local" ? "YYYY-MM-DDTHH:mm" : "YYYY-MM-DD"
      );
      setFormattedDate(formatted);
      setSelectedDate(date);
      setValue(name, formatted);
      onDateChange?.(name, formatted);
    }
  };

  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect={dateType === "datetime-local"}
        dateFormat={
          dateType === "datetime-local" ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"
        }
        timeFormat="HH:mm"
        timeIntervals={15}
        disabled={disable}
        customInput={<CustomInput value={formattedDate} svg={svg} />}
        withPortal
      />
    </div>
  );
};
