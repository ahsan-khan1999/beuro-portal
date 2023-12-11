import { InputFieldProps } from "@/types/global";
import { combineClasses } from "@/utils/utility";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "next-i18next";

export default function InputField({
  value,
  handleChange,
  textClassName,
  containerClassName,
  iconDisplay,
  bgColor,
}: InputFieldProps) {
  const inputClasses = combineClasses(
    `${
      bgColor ? "bg-[#F4F4F4]" : "bg-white"
    } w-full  text-sm  rounded-lg  pr-8 pl-3 py-2 focus:outline-none placeholder:text-[#222B45] text-[#222B45] text-[13px] border border-white focus:border-[#6665FF]`,
    textClassName
  );

  const { t: translate } = useTranslation();
  const containerClasses = combineClasses("min-w-[274px]", containerClassName);
  const router = useRouter();
  return (
    <div className={containerClasses}>
      <div className="relative w-full ">
        <input
          id="searchBar"
          type="text"
          value={value}
          placeholder="Search..."
          className={inputClasses}
          onChange={(e) => handleChange(e.target.value)}
        />
        {iconDisplay && (
          <div
            className={`absolute top-1/2 ${
              router.pathname.includes("dashboard") ? "left-0" : "right-3"
            }  transform -translate-y-1/2`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.42057 9.16667C4.42057 6.40917 6.66307 4.16667 9.42057 4.16667C12.1781 4.16667 14.4206 6.40917 14.4206 9.16667C14.4206 11.9242 12.1781 14.1667 9.42057 14.1667C6.66307 14.1667 4.42057 11.9242 4.42057 9.16667ZM17.5097 16.0775L14.6806 13.2475C15.5581 12.1192 16.0872 10.705 16.0872 9.16667C16.0872 5.49083 13.0964 2.5 9.42057 2.5C5.74474 2.5 2.75391 5.49083 2.75391 9.16667C2.75391 12.8425 5.74474 15.8333 9.42057 15.8333C10.9589 15.8333 12.3731 15.3042 13.5014 14.4267L16.3314 17.2558C16.4939 17.4183 16.7072 17.5 16.9206 17.5C17.1339 17.5 17.3472 17.4183 17.5097 17.2558C17.8356 16.93 17.8356 16.4033 17.5097 16.0775Z"
                fill="#C5CEE0"
              />
              <mask
                id="mask0_702_12632"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="2"
                y="2"
                width="16"
                height="16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.42057 9.16667C4.42057 6.40917 6.66307 4.16667 9.42057 4.16667C12.1781 4.16667 14.4206 6.40917 14.4206 9.16667C14.4206 11.9242 12.1781 14.1667 9.42057 14.1667C6.66307 14.1667 4.42057 11.9242 4.42057 9.16667ZM17.5097 16.0775L14.6806 13.2475C15.5581 12.1192 16.0872 10.705 16.0872 9.16667C16.0872 5.49083 13.0964 2.5 9.42057 2.5C5.74474 2.5 2.75391 5.49083 2.75391 9.16667C2.75391 12.8425 5.74474 15.8333 9.42057 15.8333C10.9589 15.8333 12.3731 15.3042 13.5014 14.4267L16.3314 17.2558C16.4939 17.4183 16.7072 17.5 16.9206 17.5C17.1339 17.5 17.3472 17.4183 17.5097 17.2558C17.8356 16.93 17.8356 16.4033 17.5097 16.0775Z"
                  fill="white"
                />
              </mask>

              <g mask="url(#mask0_702_12632)"></g>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
