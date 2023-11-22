import { DatePickerProps } from "@/types";
import { formatDateString } from "@/utils/functions";
import { combineClasses } from "@/utils/utility";
import { useState } from "react";

export const DatePicker = ({
  id,
  name,
  register,
  value,
  className,
  remove,
  svg,
  success,
  onRemove,
  dateType
}: DatePickerProps) => {
  const [inputFocus, setInputFocus] = useState(false);
  const defaultClasses = `border border-borderColor rounded-lg w-full  ${
    success ? "pl-4 pr-10" : "pl-11 pr-4"
  } py-[10px] outline-none text-dark text-sm focus:border-primary  `;
  const classes = combineClasses(defaultClasses, className);
  return (
    <>
      <div className={`relative w-full flex items-center`}>
        {remove && (
          <div
            className="cursor-pointer top-0 absolute left-80 bg-red px-3 py-1 mt-1 text-white rounded-t-md"
            onClick={onRemove}
          >
            {remove}
          </div>
        )}

        {svg && (
          <span
            className={`mr-3 absolute  left-4 z-50 ${
              (inputFocus && "tests") || "test"
            }`}
            dangerouslySetInnerHTML={{ __html: svg }}
          />
        )}

        <input
          type={dateType}
          // value={formatDateString(value)}
          defaultValue={formatDateString(value)}
          id={id}
          onBlurCapture={() => setInputFocus(false)}
          {...register(name)}
          // style={{
          //   backgroundImage: 'url("@/assets/svgs/calender.svg")',
          //   backgroundPosition: "4% 50%",
          // }}
          className={`${classes} relative`}
        />
      </div>
    </>
  );
};
