import SelectField from "@/base-components/filter/fields/select-field";
import { DashboardFiltersToggle } from "@/enums/dashboard";
import { FiltersComponentProps } from "@/types";
import { getKeyByValue } from "@/utils/auth.util";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

export default function DashboardFilters({
  filter,
  handleFilterChange,
  setFilter,
}: FiltersComponentProps) {
  const [isOpen, setIsOpen] = useState({
    [DashboardFiltersToggle.month]: false,
    [DashboardFiltersToggle.week]: false,
  });

  const { t: translate } = useTranslation();

  const handleSelectToggle = (type: DashboardFiltersToggle) => {
    setIsOpen((prev) => ({
      ...prev,
      [type]: !isOpen[type],
    }));
  };

  const monthObj = {
    January: "1",
    February: "2",
    March: "3",
    April: "4",
    May: "5",
    June: "6",
    July: "7",
    August: "8",
    September: "9",
    October: "10",
    November: "11",
    December: "12",
  };

  return (
    <div className="flex space-x-4">
      {/* <SelectField
        handleChange={(value) => console.log(value)}
        value=""
        dropDownIconClassName=""

        options={[
          { label: translate("dashboard_detail.options_labels.week"), value: "week" },
          { label: translate("dashboard_detail.options_labels.month"), value: "month" },
          { label: translate("dashboard_detail.options_labels.year"), value: "year" },

        ]}
        label={translate("dashboard_detail.options_labels.month")}
        containerClassName="bg-white rounded-[7px] border border-[#8F8F8F80] w-[105px]"
      /> */}
      <SelectField
        handleChange={(value) => {
          setFilter({ ...filter, month: Number(value) });
          handleFilterChange({ ...filter, month: Number(value) });
        }}
        value={(filter?.month as any) || "1"}
        dropDownIconClassName=""
        isSearch={false}
        options={[
          { label: translate("dashboard_detail.months.jan"), value: "1" },
          { label: translate("dashboard_detail.months.feb"), value: "2" },
          { label: translate("dashboard_detail.months.mar"), value: "3" },
          { label: translate("dashboard_detail.months.apr"), value: "4" },
          { label: translate("dashboard_detail.months.may"), value: "5" },
          { label: translate("dashboard_detail.months.jun"), value: "6" },
          { label: translate("dashboard_detail.months.jul"), value: "7" },
          { label: translate("dashboard_detail.months.aug"), value: "8" },
          { label: translate("dashboard_detail.months.sep"), value: "9" },
          { label: translate("dashboard_detail.months.oct"), value: "10" },
          { label: translate("dashboard_detail.months.nov"), value: "11" },
          { label: translate("dashboard_detail.months.dec"), value: "12" },
        ]}
        label={translate(
          `selected_month.${getKeyByValue(monthObj, filter?.month?.toString())}`
        )}
        containerClassName="bg-white rounded-lg border border-[#8F8F8F80] w-[135px]"
      />
    </div>
  );
}
