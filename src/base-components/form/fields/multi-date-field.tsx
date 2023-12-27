import { Controller } from "react-hook-form";
import { DateRangeValueProps, MultiDateProps, PhoneProps } from "@/types";
//@ts-expect-error
import { DateRange } from "react-date-range";

import moment from "moment";
import { useEffect, useState } from "react";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

export const MultiDateField = ({
  name,
  control,
  value,
  disabled,
  remove,
  onRemove,
}: MultiDateProps) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [dateRange, setDateRange] = useState({
    startDate: moment(value?.startDate).toDate(),
    endDate: moment(value?.endDate).toDate(),
  });
  useEffect(() => {
    if (value) {
      setDateRange({
        startDate: moment(value?.startDate).toDate(),
        endDate: moment(value?.endDate).toDate(),
      });
    }
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange: handleChange, value } }) => {
        return (
          <div className="relative w-full">
            {remove && (
              <div
                className="cursor-pointer -top-9 absolute left-80 bg-red px-3 py-1 mt-1 text-white rounded-t-md"
                onClick={onRemove}
              >
                {remove}
              </div>
            )}
            <DateRange
              editableDateInputs={true}
              moveRangeOnFirstSelection={false}
              ranges={state}
              selectedRange={dateRange}
              onChange={(val: DateRangeValueProps) => {
                let { selection } = val;
                // setDateRange({
                //   startDate: selection.startDate,
                //   endDate: selection.endDate,
                // })
                handleChange({
                  startDate: selection.startDate,
                  endDate: selection.endDate,
                });
              }}
            />
          </div>
        );
      }}
    />
  );
};
