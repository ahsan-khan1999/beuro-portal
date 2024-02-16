import React, { useState } from "react";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { FilterProps } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks";
import DatePicker from "./fields/date-picker";
import useFilter from "@/hooks/filter/hook";
import { formatDateForDatePicker } from "@/utils/utility";
import { FiltersDefaultValues } from "@/enums/static";
import { useTranslation } from "next-i18next";

export default function EmployeesFilter({
  filter,
  setFilter,
  onFilterChange,
}: FilterProps) {
  const moreFilters = {
    date: {
      $gte: FiltersDefaultValues.$gte,
      $lte: FiltersDefaultValues.$lte,
    },
  };
  const {
    moreFilter,
    setMoreFilter,
    handleFilterResetToInitial,
    handleFilterReset,
    handleExtraFilterToggle,
    handleExtraFiltersClose,
    extraFilterss,
  } = useFilter({ filter, setFilter, moreFilters });
  const { t: translate } = useTranslation();
  const handleSave = () => {
    setFilter((prev: any) => {
      const updatedFilter = {
        ...prev,
        date: {
          $gte: moreFilter.date && moreFilter.date.$gte,
          $lte: moreFilter.date && moreFilter.date.$lte,
        },
      };
      onFilterChange(updatedFilter);
      return updatedFilter;
    });
    handleExtraFiltersClose();
  };
  const handleDateChange = (dateRange: "$gte" | "$lte", val: string) => {
    const dateTime = new Date(val);
    setMoreFilter((prev) => ({
      ...prev,
      date: { ...prev.date, [dateRange]: dateTime?.toISOString() },
    }));
  };
  const ref = useOutsideClick<HTMLDivElement>(handleExtraFiltersClose);
  return (
    <div className="relative flex my-auto cursor-pointer " ref={ref}>
      <svg
        onClick={handleExtraFilterToggle}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <g clipPath="url(#clip0_702_12694)">
          <path
            d="M7.43477 0.291992C6.32977 0.291992 5.39477 1.00599 5.03777 1.99199H0.634766V3.69199H5.03777C5.38627 4.67799 6.32127 5.39199 7.43477 5.39199C8.83727 5.39199 9.98477 4.24449 9.98477 2.84199C9.98477 1.43949 8.83727 0.291992 7.43477 0.291992ZM11.6848 1.99199V3.69199H17.6348V1.99199H11.6848ZM11.6848 6.24199C10.5798 6.24199 9.64477 6.95599 9.28777 7.94199H0.634766V9.64199H9.28777C9.63627 10.628 10.5713 11.342 11.6848 11.342C13.0873 11.342 14.2348 10.1945 14.2348 8.79199C14.2348 7.38949 13.0873 6.24199 11.6848 6.24199ZM15.9348 7.94199V9.64199H17.6348V7.94199H15.9348ZM4.88477 12.192C3.77977 12.192 2.84477 12.906 2.48777 13.892H0.634766V15.592H2.48777C2.83627 16.578 3.77127 17.292 4.88477 17.292C6.28727 17.292 7.43477 16.1445 7.43477 14.742C7.43477 13.3395 6.28727 12.192 4.88477 12.192ZM9.13477 13.892V15.592H17.6348V13.892H9.13477Z"
            fill="#404040"
          />
        </g>
        <defs>
          <clipPath id="clip0_702_12694">
            <rect
              width="17"
              height="17"
              fill="white"
              transform="translate(0.634766 0.291992)"
            />
          </clipPath>
        </defs>
      </svg>
      <AnimatePresence>
        {extraFilterss && (
          <motion.div
            className="absolute right-0 top-10 bg-white p-5 min-w-[400px] rounded-lg shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between border-b border-lightGray pb-3">
              <span className="font-medium text-lg">
                {translate("filters.extra_filters.heading")}
              </span>
              <span
                className=" text-base text-red cursor-pointer"
                onClick={handleFilterResetToInitial}
              >
                {translate("filters.extra_filters.reset_all")}
              </span>
            </div>
            <div>
              <div className="mt-5 mb-2">
                <div className="flex justify-between">
                  <label htmlFor="type" className="font-medium text-base">
                    {translate("filters.extra_filters.date")}
                  </label>
                  <label
                    htmlFor="type"
                    className="cursor-pointer text-red"
                    onClick={() => {
                      handleFilterReset("date", {
                        $gte: FiltersDefaultValues.$gte,
                        $lte: FiltersDefaultValues.$lte,
                      });
                    }}
                  >
                    {translate("filters.extra_filters.reset")}
                  </label>
                </div>
                <div>
                  <DatePicker
                    label={translate("filters.extra_filters.from")}
                    label2={translate("filters.extra_filters.to")}
                    dateFrom={formatDateForDatePicker(
                      (moreFilter.date?.$gte && moreFilter?.date?.$gte) ||
                        FiltersDefaultValues.$gte
                    )}
                    dateTo={formatDateForDatePicker(
                      (moreFilter.date?.$lte && moreFilter?.date?.$lte) ||
                        FiltersDefaultValues.$lte
                    )}
                    onChangeFrom={(val) => handleDateChange("$gte", val)}
                    onChangeTo={(val) => handleDateChange("$lte", val)}
                  />
                </div>
              </div>
              {/* <div>
                <div className="flex justify-between mt-6">
                  <label htmlFor="type" className=" ">
                    Location
                  </label>
                  <label
                    htmlFor="type"
                    className="cursor-pointer text-red"
                    onClick={() => handleFilterReset("location", "")}
                  >
                    Reset
                  </label>
                </div>

                <InputField
                  iconDisplay={false}
                  handleChange={(value) =>
                    setMoreFilter((prev) => ({ ...prev, location: value }))
                  }
                  value={moreFilter.location || ""}
                  textClassName="border border-black min-h-[42px]"
                  containerClassName=" my-2"
                />
              </div> */}
            </div>
            <div>
              <BaseButton
                buttonText={translate("common.save_button")}
                onClick={handleSave}
                containerClassName="bg-primary my-6 px-8 py-2"
                textClassName="text-white"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
