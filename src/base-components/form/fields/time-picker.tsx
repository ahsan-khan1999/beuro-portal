import moment from "moment";
import { combineClasses } from "@/utils/utility";
import { hoursArr, minsArr } from "@/utils/static";
import { TimeIcon } from "@/assets/svgs/components/time-icon";
import React, { useEffect, useState } from "react";
import { TimePickerProps } from "@/types";

export const TimePicker = ({
  id,
  name,
  register,
  value,
  className,
  remove,
  svg,
  success,
  onRemove,
  dateType,
  min,
  max,
  placeholder,
  handleChange,
}: TimePickerProps) => {
  const [hours, setHours] = useState<any>(null);
  const [mins, setMins] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [optionsActive, setOptionsActive] = useState(false);

  useEffect(() => {
    if (value) {
      setHours(value);
      // setMins(moment(value).format("mm"));
    }
  }, [value]);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClose = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const submit = (hoursTime: any, minTime: any) => {
    let date = new Date();
    date.setHours(hoursTime);
    date.setMinutes(minTime);
    date.setSeconds("00" as any);
    handleChange(date);
    handleClick();
  };

  const handleSelectHour = (item: string) => {
    setHours(item);
    if (mins) {
      submit(item, mins);
    }
  };

  const handleSelectMin = (item: string) => {
    setMins(item);
    if (hours) {
      submit(hours, item);
    }
  };

  const handleOptions = () => {
    setOptionsActive((prev) => !prev);
  };

  const defaultClasses = `w-full rounded-lg max-h-12 ${
    success ? "pl-4 pr-10" : "pl-11 pr-4"
  } py-2 outline-none text-dark text-sm font-normal text-[#64748B] focus:border-primary`;

  const classes = combineClasses(defaultClasses, className);

  return (
    <div className={`${classes}`} onMouseLeave={handleClose}>
      <div
        className="w-full flex justify-between items-center px-2 cursor-pointer"
        onClick={handleClick}
      >
        <div className="min-w-[80px]">
          {!hours && !mins && <p className="text-gray-400">{placeholder}</p>}
          {(hours || mins) && (
            <p>
              {hours || "00"}:{mins || "00"}
            </p>
          )}
        </div>
        <TimeIcon />
      </div>
      {isOpen && (
        <div
          className="flex gap-2 absolute top-10 pt-2 right-0 left-0 bg-[#fff] z-[999] px-2 py-1 border border-t-0"
          onMouseEnter={handleOptions}
          onMouseLeave={handleClick}
        >
          <div className="w-[50%]">
            <span>{translate("common.hours")}</span>
            <div className="max-h-[125px] overflow-y-auto">
              {hoursArr.map((item, i) => {
                return (
                  <option
                    className="cursor-pointer hover:bg-lightGray"
                    key={i}
                    value={item}
                    onClick={() => handleSelectHour(item)}
                  >
                    {item}
                  </option>
                );
              })}
            </div>
          </div>
          <div className="w-[50%]">
            <span>{translate("common.minutes")}</span>
            <div className="max-h-[125px] overflow-y-auto">
              {minsArr.map((item, i) => {
                return (
                  <option
                    className="cursor-pointer hover:bg-lightGray"
                    key={i}
                    value={item}
                    onClick={() => handleSelectMin(item)}
                  >
                    {item}
                  </option>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
