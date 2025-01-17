import { useAppSelector } from "@/hooks/useRedux";
import { CalendarDatePickerProps } from "@/types";
import moment from "moment";
import { useState, useEffect, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { enUS, de, fr, es } from "date-fns/locale";
import { Locale as DateFnsLocale } from "date-fns";

type SupportedLocales = "en" | "de" | "fr" | "es";

export const ReactCalendarDatePickerField = ({
  id,
  name,
  value,
  svg,
  dateType = "datetime-local",
  disable,
  setValue,
  watch,
  onDateChange,
  placeholder,
}: CalendarDatePickerProps) => {
  const { currentLanguage } = useAppSelector((state) => state.global);

  const [formattedDate, setFormattedDate] = useState(
    value
      ? moment(value).format(
          dateType === "datetime-local" ? "YYYY-MM-DDTHH:mm" : "YYYY-MM-DD"
        )
      : ""
  );

  const inputVal = watch(name);

  useEffect(() => {
    if (inputVal !== formattedDate) {
      setFormattedDate(inputVal);
    }
  }, [inputVal, formattedDate]);

  useEffect(() => {
    if (value) {
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
      setValue(name, formatted);
      onDateChange?.(name, formatted);
    }
  };

  const CustomInput = forwardRef(
    ({ value, onClick }: { value: string; onClick?: () => void }, ref) => (
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
            {formattedDate
              ? moment(formattedDate).format("ddd, MMM D")
              : `${placeholder}`}
          </span>
          {dateType === "datetime-local" && (
            <span className="text-sm font-medium text-[#3C3C3C] cursor-pointer">
              {formattedDate ? moment(formattedDate).format("HH:mm") : ""}
            </span>
          )}
        </div>
      </div>
    )
  );

  const popperClassName =
    dateType === "datetime-local"
      ? formattedDate
        ? "datetime-local-popper-with-value"
        : "datetime-local-popper"
      : "date-popper";

  const locales: Record<SupportedLocales, DateFnsLocale> = {
    en: enUS,
    de: de,
    fr: fr,
    es: es,
  };

  const datePickerLocale = locales[currentLanguage as SupportedLocales] || enUS;

  return (
    <DatePicker
      selected={formattedDate ? new Date(formattedDate) : null}
      onChange={handleDateChange}
      showTimeSelect={dateType === "datetime-local"}
      dateFormat={
        dateType === "datetime-local" ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"
      }
      timeFormat="HH:mm"
      timeIntervals={15}
      disabled={disable}
      customInput={<CustomInput value={formattedDate} />}
      popperPlacement="bottom-start"
      popperClassName={popperClassName}
      locale={datePickerLocale as any}
    />
  );
};
