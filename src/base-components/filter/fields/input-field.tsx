import { InputFieldProps } from "@/types/global";
import { combineClasses, getCurrentUtcDate } from "@/utils/utility";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { forwardRef, useState } from "react";

const InputField = forwardRef(
  (
    {
      value,
      handleChange,
      onEnterPress,
      textClassName,
      containerClassName,
      inputDivClassName,
      iconDisplay,
      bgColor,
      placeholder,
    }: InputFieldProps,
    ref: React.Ref<HTMLInputElement>
  ) => {
    const router = useRouter();
    const { t: translate } = useTranslation();

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter" && onEnterPress) {
        onEnterPress();
      }
    };

    const inputClasses = combineClasses(
      `${
        bgColor ? "bg-[#F4F4F4]" : "bg-white"
      } text-sm rounded-lg pr-8 pl-3 py-2 focus:outline-none placeholder:text-[#222B45] text-[#222B45] text-[13px] border border-[#ccc] focus:border-[#6665FF]`,
      textClassName
    );

    const containerClasses = combineClasses("w-fit", containerClassName);

    const inputDivClasses = combineClasses(
      "relative flex w-fit",
      inputDivClassName
    );

    const handleInputChange = (newValue: string) => {
      handleChange(newValue);
    };

    const handleClearInput = () => {
      handleInputChange("");

      const { pathname, query } = router;

      if (query?.page) {
        delete query.page;
      }

      if (query?.text) {
        delete query.text;
      }

      // router.query.today = getCurrentUtcDate();

      router.push({
        pathname,
        query,
      });
    };

    return (
      <div className={containerClasses}>
        <div className={inputDivClasses}>
          <input
            id="searchBar"
            type="text"
            value={value}
            placeholder={placeholder ? placeholder : translate("common.search")}
            className={inputClasses}
            onChange={(e) => handleInputChange(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={ref}
          />
          {value && iconDisplay && (
            <div
              className={`absolute top-1/2 right-5 transform -translate-y-1/2 cursor-pointer`}
              onClick={handleClearInput}
            >
              <svg
                id="cancel-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
              >
                <circle
                  id="Ellipse_269"
                  data-name="Ellipse 269"
                  cx="12"
                  cy="12"
                  r="12"
                  fill="#F00"
                />
                <path
                  id="Path_19960"
                  data-name="Path 19960"
                  d="M128.622,128.622a1.177,1.177,0,0,1-1.65,0l-3.825-3.825-3.825,3.825a1.167,1.167,0,0,1-1.65-1.65l3.825-3.825-3.825-3.825a1.167,1.167,0,0,1,1.65-1.65l3.825,3.825,3.825-3.825a1.167,1.167,0,0,1,1.65,1.65l-3.825,3.825,3.825,3.825A1.177,1.177,0,0,1,128.622,128.622Z"
                  transform="translate(-111.146 -111.146)"
                  fill="#FFF"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default InputField;
