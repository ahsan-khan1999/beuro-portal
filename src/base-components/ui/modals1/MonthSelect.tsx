import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { useTranslation } from "next-i18next";
import { MonthSelectModalProps } from "@/types/admin/payments";
import { DropDown } from "../dropDown/drop-down";

const MonthSelect = ({ onClose, handleDownload }: MonthSelectModalProps) => {
  const { t: translate } = useTranslation();
  const months: string[] = [
    `${translate("common.select_month_modal.months.jan")}`,
    `${translate("common.select_month_modal.months.feb")}`,
    `${translate("common.select_month_modal.months.mar")}`,
    `${translate("common.select_month_modal.months.apr")}`,
    `${translate("common.select_month_modal.months.may")}`,
    `${translate("common.select_month_modal.months.jun")}`,
    `${translate("common.select_month_modal.months.jul")}`,
    `${translate("common.select_month_modal.months.aug")}`,
    `${translate("common.select_month_modal.months.sep")}`,
    `${translate("common.select_month_modal.months.oct")}`,
    `${translate("common.select_month_modal.months.nov")}`,
    `${translate("common.select_month_modal.months.dec")}`,
  ];

  const currentYear = new Date().getFullYear();
  const years = useMemo(() => {
    const startYear = 1980;
    const newYears = Array.from(
      { length: currentYear - startYear + 1 },
      (_, k) => startYear + k
    );
    return newYears;
  }, [currentYear]);

  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState("");

  const handleIncrementYear = useCallback(() => {
    setYear((prevYear) => (prevYear < currentYear ? prevYear + 1 : prevYear));
  }, []);

  const handleDecrementYear = useCallback(() => {
    setYear((prevYear) => (prevYear > 1980 ? prevYear - 1 : prevYear));
  }, []);

  const handleItemClick = (selectedMonth: string) => {
    setMonth(selectedMonth);
  };

  const handleSelection = () => {
    handleDownload({ month: month, year: year });
  };

  return (
    <>
      <BaseModal onClose={onClose} containerClassName="max-w-[474px] min-h-fit">
        <div className="relative flex flex-col pt-6 xl:pb-[29px] pb-4 px-[32px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <div className="flex flex-col">
            <h2 className="text-2xl font-medium text-[#000] mb-[9px]">
              {translate("common.select_month_modal.heading")}
            </h2>
            <p className="text-[#8F8F8F] text-sm font-medium mb-5">
              {translate("common.select_month_modal.description")}
            </p>

            <div className="flex justify-between items-center ">
              <DropDown
                items={years.map((y) => ({ item: String(y) }))}
                onItemSelected={(selectedYear) =>
                  setYear(parseInt(selectedYear))
                }
                selectedItem={String(year)}
                dropDownClassName="w-[100px]"
                dropDownIconClassName="text-gray"
                dropDownTextClassName="text-primary"
                dropDownItemsContainerClassName="w-[100px]"
              />
              <div className="flex items-center gap-x-[18px]">
                <button onClick={handleDecrementYear}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    className="cursor"
                  >
                    <path
                      d="M7.21684 0.787255C7.40077 0.971239 7.5041 1.22074 7.5041 1.4809C7.5041 1.74105 7.40077 1.99055 7.21684 2.17454L2.36037 7.03101L7.21684 11.8875C7.39556 12.0725 7.49445 12.3204 7.49221 12.5776C7.48998 12.8348 7.3868 13.0809 7.20489 13.2628C7.02299 13.4447 6.77691 13.5479 6.51967 13.5501C6.26243 13.5524 6.0146 13.4535 5.82956 13.2748L0.279442 7.72466C0.0955127 7.54067 -0.0078128 7.29117 -0.00781279 7.03101C-0.00781277 6.77086 0.0955127 6.52136 0.279442 6.33737L5.82956 0.787255C6.01354 0.603326 6.26305 0.5 6.5232 0.5C6.78336 0.5 7.03286 0.603326 7.21684 0.787255Z"
                      fill="#4B4B4B"
                    />
                  </svg>
                </button>
                <button onClick={handleIncrementYear}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="8"
                    height="14"
                    viewBox="0 0 8 14"
                    fill="none"
                    onClick={handleIncrementYear}
                  >
                    <path
                      d="M0.279251 0.787255C0.0953217 0.971239 -0.00800416 1.22074 -0.00800415 1.4809C-0.00800413 1.74105 0.0953217 1.99055 0.279251 2.17454L5.13573 7.03101L0.279251 11.8875C0.100535 12.0725 0.00164465 12.3204 0.00388008 12.5776C0.0061155 12.8348 0.109297 13.0809 0.291203 13.2628C0.473107 13.4447 0.719181 13.5479 0.976424 13.5501C1.23367 13.5524 1.4815 13.4535 1.66653 13.2748L7.21665 7.72466C7.40058 7.54067 7.50391 7.29117 7.50391 7.03101C7.50391 6.77086 7.40058 6.52136 7.21665 6.33737L1.66653 0.787255C1.48255 0.603326 1.23305 0.5 0.972892 0.5C0.712738 0.5 0.463235 0.603326 0.279251 0.787255Z"
                      fill="#4B4B4B"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-4 gap-x-[25px] gap-y-5">
              {months.map((item, index) => (
                <span
                  key={index}
                  onClick={() => handleItemClick(item)}
                  className={`cursor-pointer px-[25px] py-[6px] rounded-md text-base font-medium ${
                    month === item
                      ? "bg-[#4A13E7]  text-white"
                      : "bg-[#4A13E7] bg-opacity-5 text-[#1E1E1E]"
                  }`}
                >
                  {item}
                </span>
              ))}
            </div>

            <button
              onClick={handleSelection}
              className="bg-[#4A13E7] text-white rounded-lg w-full p-4 mt-5"
            >
              {translate("common.select_month_modal.button")}
            </button>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default MonthSelect;
