import React from "react";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { CheckBoxType, FilterProps, FilterType } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks";
import DatePicker from "./fields/date-picker";
import useFilter from "@/hooks/filter/hook";
import { formatDateForDatePicker } from "@/utils/utility";
import { FiltersDefaultValues } from "@/enums/static";
import { useTranslation } from "next-i18next";
import { staticEnums } from "@/utils/static";
import EmailCheckField from "./fields/email-check-field";
import { useRouter } from "next/router";
import { Button } from "@/base-components/ui/button/button";
import filtersIcon from "@/assets/pngs/filter_icon.png";

export default function ContractsFilter({
  filter,
  setFilter,
  onFilterChange,
}: FilterProps) {
  const moreFilters: FilterType = {
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

  const router = useRouter();
  const ref = useOutsideClick<HTMLDivElement>(handleExtraFiltersClose);
  const { t: translate } = useTranslation();

  const handleSave = () => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          date: JSON.stringify(moreFilter?.date),
          ...(moreFilter?.leadSource && {
            leadSource: moreFilter?.leadSource,
          }),
          emailStatus: moreFilter?.emailStatus,
        },
      },
      undefined,
      { shallow: false }
    );

    setFilter((prev: any) => {
      const updatedFilters = {
        ...prev,
        date: {
          $gte: moreFilter.date && moreFilter.date.$gte,
          $lte: moreFilter.date && moreFilter.date.$lte,
        },
        leadSource: moreFilter?.leadSource,
        emailStatus: moreFilter?.emailStatus,
      };
      onFilterChange(updatedFilters);
      return updatedFilters;
    });
    handleExtraFiltersClose();
  };

  const handleLowPriceChange = (val: string) => {
    setMoreFilter((prev) => ({
      ...prev,
      price: prev.price && [val, prev.price[1]],
    }));
  };

  const handleHighPriceChange = (val: string) => {
    setMoreFilter((prev) => ({
      ...prev,
      price: prev.price && [prev.price[0], val],
    }));
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

  const handleStatusChange = (value: string, isChecked: boolean) => {
    setMoreFilter((prev: FilterType) => {
      let updatedStatus = new Set(
        prev.leadSource !== FiltersDefaultValues.None ? prev.leadSource : []
      );

      if (isChecked) {
        updatedStatus.add(value);
      } else {
        updatedStatus.delete(value);
      }

      const emailStatus =
        updatedStatus.size > 0
          ? Array.from(updatedStatus)
          : FiltersDefaultValues.None;
      return { ...prev, leadSource: emailStatus };
    });
  };

  const checkbox: CheckBoxType[] = [
    {
      label: `${translate("email_status.Pending")}`,
      type: `${staticEnums.EmailStatus.Draft}`,
    },
    {
      label: `${translate("email_status.Sent")}`,
      type: `${staticEnums.EmailStatus.Sent}`,
    },
    {
      label: `${translate("email_status.Failed")}`,
      type: `${staticEnums.EmailStatus.Post}`,
    },
  ];

  const handleEmailFilter = (value: string, isChecked: boolean) => {
    setMoreFilter((prev: FilterType) => {
      let updatedStatus = new Set(
        prev.emailStatus !== FiltersDefaultValues.None ? prev.emailStatus : []
      );

      if (isChecked) {
        updatedStatus.add(value);
      } else {
        updatedStatus.delete(value);
      }

      const emailStatus =
        updatedStatus.size > 0
          ? Array.from(updatedStatus)
          : FiltersDefaultValues.None;

      return { ...prev, emailStatus: emailStatus };
    });
  };

  return (
    <div className="relative flex my-auto z-50" ref={ref}>
      <Button
        inputType="button"
        onClick={handleExtraFilterToggle}
        className="gap-x-2 !h-fit py-2 mt-0 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap w-fit"
        icon={filtersIcon}
        text={translate("common.filters")}
        id="add"
        iconAlt="fitlers"
      />
      {/* <svg
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
      </svg> */}
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

            <div className="mt-5 flex flex-col gap-y-3">
              <div className="flex justify-between items-center">
                <label htmlFor="type" className="font-medium text-base">
                  {translate("filters.extra_filters.leadSource")}
                </label>
                <label
                  htmlFor="type"
                  className="cursor-pointer text-red"
                  onClick={() => {
                    handleFilterReset("leadSource", "None");
                  }}
                >
                  {translate("filters.extra_filters.reset")}
                </label>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {Object?.keys(staticEnums["LeadSource"]).map((item, idx) => (
                  <EmailCheckField
                    key={idx}
                    checkboxFilter={moreFilter as unknown as FilterType}
                    setCheckBoxFilter={setMoreFilter}
                    type={"leadSource"}
                    label={item}
                    value={item}
                    onChange={(value, isChecked) =>
                      handleStatusChange(value, isChecked)
                    }
                  />
                ))}
              </div>
            </div>
            <div className="mt-5 mb-2 flex flex-col gap-y-3">
              <div className="flex justify-between">
                <label htmlFor="type" className="font-medium text-base">
                  {translate("agent.report_contact_fields.email")}
                </label>
                <label
                  htmlFor="type"
                  className="cursor-pointer text-red"
                  onClick={() => handleFilterReset("emailStatus", [])}
                >
                  {translate("filters.extra_filters.reset")}
                </label>
              </div>
              <div className="flex items-center gap-2">
                {checkbox?.map((item, idx) => (
                  <EmailCheckField
                    key={idx}
                    checkboxFilter={moreFilter as unknown as FilterType}
                    setCheckBoxFilter={setFilter}
                    type={"emailStatus"}
                    label={item.label}
                    value={item.type}
                    onChange={(value, isChecked) =>
                      handleEmailFilter(value, isChecked)
                    }
                  />
                ))}
              </div>
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
