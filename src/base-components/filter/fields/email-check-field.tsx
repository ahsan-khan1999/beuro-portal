import { CheckFieldProps } from "@/types/global";
import React from "react";

export default function EmailCheckField({
  label,
  checkboxFilter,
  setCheckBoxFilter,
  type,
  defaultChecked,
  value,
}: CheckFieldProps) {
  return (
    <>
      <label className={`custom-checkbox px-[11px] py-[14px]   h-fit bg-white rounded-md relative cursor-pointer w-fit flex items-center flex-row-reverse gap-x-3 border border-lightDark ${checkboxFilter[type] === value ? "border-primary" : ""} `}>
        <input
          type="checkbox"
          name="check"
          // defaultChecked={defaultChecked === type}
          className="hidden"
          onChange={(e) =>
            setCheckBoxFilter({ ...checkboxFilter, [type]: value })
          }
        />
        <span className="checkbox-control"></span>

        <p className={`text-base font-medium text-[#393939] whitespace-nowrap ${checkboxFilter[type] === value ? "text-primary" : ""}`}>
          {label}
        </p>
        {checkboxFilter[type] === value ? (
          <svg
            className=" top-1 right-1"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none">
            <path
              d="M7.03125 0.8125C5.90637 0.8125 4.80675 1.14607 3.87145 1.77102C2.93614 2.39597 2.20716 3.28423 1.77669 4.32349C1.34621 5.36274 1.23358 6.50631 1.45304 7.60958C1.67249 8.71284 2.21417 9.72626 3.00958 10.5217C3.80499 11.3171 4.81841 11.8588 5.92168 12.0782C7.02494 12.2977 8.16851 12.185 9.20776 11.7546C10.247 11.3241 11.1353 10.5951 11.7602 9.65981C12.3852 8.7245 12.7188 7.62488 12.7188 6.5C12.7188 4.99158 12.1195 3.54494 11.0529 2.47833C9.98631 1.41172 8.53967 0.8125 7.03125 0.8125ZM6.21875 8.77094L4.1875 6.73969L4.83344 6.09375L6.21875 7.47906L9.22906 4.46875L9.87744 5.11306L6.21875 8.77094Z"
              fill="#4A13E7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none">
            <path
              d="M7.0919 0C3.18145 0 0 3.18137 0 7.0919C0 11.0024 3.18145 14.1839 7.0919 14.1839C11.0023 14.1839 14.1838 11.0024 14.1838 7.0919C14.1838 3.18137 11.0024 0 7.0919 0ZM11.1642 5.89402L6.70871 10.3495C6.51926 10.5389 6.26743 10.6432 5.99954 10.6432C5.73165 10.6432 5.47982 10.5389 5.29038 10.3495L3.0196 8.07872C2.83016 7.88927 2.72581 7.63744 2.72581 7.36955C2.72581 7.10159 2.83016 6.84976 3.0196 6.66031C3.20898 6.47087 3.46081 6.36652 3.72877 6.36652C3.99666 6.36652 4.24857 6.47087 4.43794 6.66039L5.99947 8.22184L9.74571 4.47561C9.93515 4.28616 10.187 4.18189 10.4549 4.18189C10.7228 4.18189 10.9746 4.28616 11.164 4.47561C11.5552 4.86678 11.5552 5.50299 11.1642 5.89402Z"
              fill="#BFBFBF"
            />
          </svg>
        )}
      </label>
    </>
  );
}
