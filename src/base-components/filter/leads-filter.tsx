import React from "react";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { FilterProps } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks";
import DatePicker from "./fields/date-picker";
import useFilter from "@/hooks/filter/hook";
import { combineClasses, formatDateForDatePicker } from "@/utils/utility";
import { FiltersDefaultValues } from "@/enums/static";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Button } from "@/base-components/ui/button/button";
import filtersIcon from "@/assets/pngs/filter_icon.png";

export default function LeadsFilter({
  filter,
  setFilter,
  onFilterChange,
  containerClassName,
}: FilterProps) {
  const router = useRouter();

  const moreFilters = {
    date: {
      $gte: FiltersDefaultValues.$gte,
      $lte: FiltersDefaultValues.$lte,
    },
  };

  const {
    extraFilterss,
    moreFilter,
    setMoreFilter,
    handleFilterResetToInitial,
    handleFilterReset,
    handleExtraFilterToggle,
    handleExtraFiltersClose,
  } = useFilter({ filter, setFilter, moreFilters });

  const ref = useOutsideClick<HTMLDivElement>(handleExtraFiltersClose);
  const { t: translate } = useTranslation();

  const handleSave = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          date: JSON.stringify(moreFilter.date),
        },
      },
      undefined,
      { shallow: false }
    );

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
    let dateTime: string | undefined = undefined;

    if (val && !isNaN(new Date(val).getTime())) {
      dateTime = new Date(val).toISOString();
    }

    setMoreFilter((prev) => ({
      ...prev,
      date: { ...prev.date, [dateRange]: dateTime },
    }));
  };

  const defaultClasses = combineClasses(
    "relative flex my-auto w-[85px] z-10",
    containerClassName
  );

  return (
    <div className={defaultClasses} ref={ref}>
      <Button
        inputType="button"
        onClick={handleExtraFilterToggle}
        className="gap-x-2 !h-fit py-2 mt-0 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap w-fit"
        icon={filtersIcon}
        text={translate("common.filters")}
        id="add"
        iconAlt="fitlers"
      />

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
                className="text-base text-red cursor-pointer"
                onClick={handleFilterResetToInitial}
              >
                {translate("filters.extra_filters.reset_all")}
              </span>
            </div>
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

            <BaseButton
              buttonText={translate("common.apply_button")}
              onClick={handleSave}
              containerClassName="bg-primary my-2 px-8 py-2"
              textClassName="text-white"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
