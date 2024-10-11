import { UIDatePickerProps } from "@/types";
import { combineClasses, convertUTCToLocalDate } from "@/utils/utility";
import React, { useRef } from "react";

export const CustomDatePciker: React.FC<UIDatePickerProps> = ({
  id,
  name,
  value,
  className,
  onInputChange,
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (dateInputRef?.current) {
      dateInputRef?.current?.focus();
    }
  };

  const defaultClasses =
    "appearance-none w-full border border-[#ccc] bg-no-repeat h-10 py-3 px-4 focus:border-lightGray outline-none focus:border-primary outline-none rounded-lg text-sm";

  const classes = combineClasses(defaultClasses, className);

  const formatedValue = convertUTCToLocalDate(value || "");

  return (
    <div className="relative w-full" onClick={handleFocus}>
      <input
        type="date"
        id={id}
        name={name}
        value={formatedValue}
        ref={dateInputRef}
        onFocus={handleFocus}
        onChange={onInputChange}
        className={classes}
      />
      <div className="absolute inset-y-0 right-0 left-0 flex items-center justify-end pr-3 cursor-pointer w-[100%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 16 16"
          fill="none"
        >
          <path
            d="M12.8516 2.12109H11.3516V1.37109C11.3516 1.17218 11.2725 0.981416 11.1319 0.840764C10.9912 0.700111 10.8005 0.621094 10.6016 0.621094C10.4026 0.621094 10.2119 0.700111 10.0712 0.840764C9.93058 0.981416 9.85156 1.17218 9.85156 1.37109V2.12109H5.35156V1.37109C5.35156 1.17218 5.27254 0.981416 5.13189 0.840764C4.99124 0.700111 4.80047 0.621094 4.60156 0.621094C4.40265 0.621094 4.21188 0.700111 4.07123 0.840764C3.93058 0.981416 3.85156 1.17218 3.85156 1.37109V2.12109H2.35156C1.75483 2.12109 1.18253 2.35815 0.760572 2.7801C0.338615 3.20206 0.101563 3.77436 0.101562 4.37109V13.3711C0.101563 13.9678 0.338615 14.5401 0.760572 14.9621C1.18253 15.384 1.75483 15.6211 2.35156 15.6211H12.8516C13.4483 15.6211 14.0206 15.384 14.4426 14.9621C14.8645 14.5401 15.1016 13.9678 15.1016 13.3711V4.37109C15.1016 3.77436 14.8645 3.20206 14.4426 2.7801C14.0206 2.35815 13.4483 2.12109 12.8516 2.12109ZM13.6016 13.3711C13.6016 13.57 13.5225 13.7608 13.3819 13.9014C13.2412 14.0421 13.0505 14.1211 12.8516 14.1211H2.35156C2.15265 14.1211 1.96188 14.0421 1.82123 13.9014C1.68058 13.7608 1.60156 13.57 1.60156 13.3711V8.12109H13.6016V13.3711ZM13.6016 6.62109H1.60156V4.37109C1.60156 4.17218 1.68058 3.98142 1.82123 3.84076C1.96188 3.70011 2.15265 3.62109 2.35156 3.62109H3.85156V4.37109C3.85156 4.57001 3.93058 4.76077 4.07123 4.90142C4.21188 5.04208 4.40265 5.12109 4.60156 5.12109C4.80047 5.12109 4.99124 5.04208 5.13189 4.90142C5.27254 4.76077 5.35156 4.57001 5.35156 4.37109V3.62109H9.85156V4.37109C9.85156 4.57001 9.93058 4.76077 10.0712 4.90142C10.2119 5.04208 10.4026 5.12109 10.6016 5.12109C10.8005 5.12109 10.9912 5.04208 11.1319 4.90142C11.2725 4.76077 11.3516 4.57001 11.3516 4.37109V3.62109H12.8516C13.0505 3.62109 13.2412 3.70011 13.3819 3.84076C13.5225 3.98142 13.6016 4.17218 13.6016 4.37109V6.62109Z"
            fill="#4A13E7"
          />
        </svg>
      </div>
    </div>
  );
};
