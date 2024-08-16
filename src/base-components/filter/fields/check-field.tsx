import { CheckFieldProps } from "@/types/global";
import { combineClasses } from "@/utils/utility";
import React, { ChangeEvent } from "react";

export default function CheckField({
  label,
  checkboxFilter,
  setCheckBoxFilter,
  type,
  value,
  onChange,
  containerClassName,
  isMobile,
}: CheckFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    let currentValues: string[] = [];
    if (Array.isArray(checkboxFilter[type])) {
      currentValues = checkboxFilter[type] as string[];
    }

    const newValues = isChecked
      ? [...currentValues, value]
      : currentValues.filter((item) => item !== value);

    setCheckBoxFilter({ ...checkboxFilter, [type]: newValues });
    onChange?.(value, isChecked);
  };

  const isCheckboxChecked = (() => {
    const filterValue = checkboxFilter[type];

    if (Array.isArray(filterValue)) {
      return filterValue.includes(value);
    }
    return false;
  })();

  const defaultClasses = combineClasses(
    `custom-checkbox py-2 pl-[10px] pr-[22px] h-fit ${
      isMobile && isCheckboxChecked ? "bg-primary" : "bg-white"
    } rounded-md relative cursor-pointer w-fit`,
    containerClassName
  );

  return (
    <>
      <label htmlFor={label} className={defaultClasses}>
        <input
          type="checkbox"
          name={label}
          id={label}
          className="hidden"
          checked={isCheckboxChecked}
          onChange={handleChange}
        />

        <span className="checkbox-control" />
        {isMobile && (
          <div className="flex items-center gap-x-1">
            {isCheckboxChecked ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                className="min-w-[17px]"
              >
                <path
                  d="M8.45606 1.01904C7.07159 1.01904 5.71821 1.42959 4.56707 2.19876C3.41592 2.96793 2.51871 4.06118 1.9889 5.34026C1.45909 6.61934 1.32046 8.02681 1.59056 9.38467C1.86066 10.7425 2.52734 11.9898 3.50631 12.9688C4.48528 13.9478 5.73256 14.6144 7.09043 14.8845C8.44829 15.1546 9.85576 15.016 11.1348 14.4862C12.4139 13.9564 13.5072 13.0592 14.2763 11.908C15.0455 10.7569 15.4561 9.40351 15.4561 8.01904C15.4561 6.16253 14.7186 4.38205 13.4058 3.0693C12.093 1.75654 10.3126 1.01904 8.45606 1.01904ZM7.45606 10.814L4.95606 8.31404L5.75106 7.51904L7.45606 9.22404L11.1611 5.51904L11.9591 6.31204L7.45606 10.814Z"
                  fill="white"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                className="min-w-[17px]"
              >
                <g opacity="0.5">
                  <path
                    d="M7.96502 10.7023L5.4873 8.22413L6.18751 7.52392L7.96502 9.30094L11.7237 5.54175L12.4249 6.24294L7.96502 10.7023Z"
                    fill="black"
                  />
                  <path
                    d="M8.95617 1.08179C7.58404 1.08179 6.24272 1.48867 5.10184 2.25099C3.96095 3.0133 3.07174 4.09681 2.54665 5.36449C2.02156 6.63217 1.88417 8.02709 2.15186 9.37286C2.41955 10.7186 3.08029 11.9548 4.05054 12.925C5.02078 13.8953 6.25694 14.556 7.60271 14.8237C8.94847 15.0914 10.3434 14.954 11.6111 14.4289C12.8788 13.9038 13.9623 13.0146 14.7246 11.8737C15.4869 10.7328 15.8938 9.39153 15.8938 8.0194C15.8938 6.17943 15.1629 4.41482 13.8618 3.11377C12.5607 1.81271 10.7961 1.08179 8.95617 1.08179ZM8.95617 13.9659C7.78006 13.9659 6.63036 13.6172 5.65246 12.9637C4.67456 12.3103 3.91238 11.3816 3.4623 10.295C3.01222 9.20845 2.89446 8.0128 3.12391 6.85929C3.35335 5.70578 3.9197 4.64621 4.75134 3.81457C5.58298 2.98293 6.64255 2.41658 7.79606 2.18713C8.94957 1.95769 10.1452 2.07545 11.2318 2.52553C12.3184 2.9756 13.2471 3.73779 13.9005 4.71569C14.5539 5.69359 14.9027 6.84329 14.9027 8.0194C14.9027 9.59651 14.2762 11.109 13.161 12.2242C12.0458 13.3394 10.5333 13.9659 8.95617 13.9659Z"
                    fill="black"
                  />
                </g>
              </svg>
            )}

            <p
              className={`text-xs font-medium ${
                isCheckboxChecked && isCheckboxChecked
                  ? "text-white"
                  : "text-[#393939]"
              } text-[#393939] whitespace-nowrap`}
            >
              {label}
            </p>
          </div>
        )}
        {!isMobile && (
          <>
            <p className="text-[13px] font-medium text-[#393939] whitespace-nowrap">
              {label}
            </p>
            {isCheckboxChecked ? (
              <svg
                className="absolute top-1 right-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
              >
                <path
                  d="M7.03125 0.8125C5.90637 0.8125 4.80675 1.14607 3.87145 1.77102C2.93614 2.39597 2.20716 3.28423 1.77669 4.32349C1.34621 5.36274 1.23358 6.50631 1.45304 7.60958C1.67249 8.71284 2.21417 9.72626 3.00958 10.5217C3.80499 11.3171 4.81841 11.8588 5.92168 12.0782C7.02494 12.2977 8.16851 12.185 9.20776 11.7546C10.247 11.3241 11.1353 10.5951 11.7602 9.65981C12.3852 8.7245 12.7188 7.62488 12.7188 6.5C12.7188 4.99158 12.1195 3.54494 11.0529 2.47833C9.98631 1.41172 8.53967 0.8125 7.03125 0.8125ZM6.21875 8.77094L4.1875 6.73969L4.83344 6.09375L6.21875 7.47906L9.22906 4.46875L9.87744 5.11306L6.21875 8.77094Z"
                  fill="#4A13E7"
                />
              </svg>
            ) : (
              <svg
                className="absolute top-1 right-1"
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="13"
                viewBox="0 0 14 13"
                fill="none"
              >
                <path
                  d="M6.21875 8.69944L4.1875 6.66778L4.76153 6.09375L6.21875 7.55056L9.30016 4.46875L9.875 5.04359L6.21875 8.69944Z"
                  fill="black"
                />
                <path
                  d="M7.03125 0.8125C5.90637 0.8125 4.80675 1.14607 3.87145 1.77102C2.93614 2.39597 2.20716 3.28423 1.77669 4.32349C1.34621 5.36274 1.23358 6.50631 1.45304 7.60958C1.67249 8.71284 2.21417 9.72626 3.00958 10.5217C3.80499 11.3171 4.81841 11.8588 5.92168 12.0782C7.02494 12.2977 8.16851 12.185 9.20776 11.7546C10.247 11.3241 11.1353 10.5951 11.7602 9.65981C12.3852 8.7245 12.7188 7.62488 12.7188 6.5C12.7188 4.99158 12.1195 3.54494 11.0529 2.47833C9.98631 1.41172 8.53967 0.8125 7.03125 0.8125ZM7.03125 11.375C6.06707 11.375 5.12454 11.0891 4.32285 10.5534C3.52116 10.0177 2.89632 9.25637 2.52734 8.36558C2.15836 7.47479 2.06182 6.49459 2.24992 5.54893C2.43803 4.60328 2.90233 3.73464 3.58411 3.05285C4.26589 2.37107 5.13453 1.90677 6.08019 1.71867C7.02585 1.53057 8.00604 1.62711 8.89683 1.99609C9.78762 2.36506 10.549 2.98991 11.0847 3.7916C11.6203 4.59328 11.9063 5.53582 11.9063 6.5C11.9063 7.79293 11.3926 9.03291 10.4784 9.94715C9.56416 10.8614 8.32418 11.375 7.03125 11.375Z"
                  fill="black"
                />
              </svg>
            )}
          </>
        )}
      </label>
    </>
  );
}
