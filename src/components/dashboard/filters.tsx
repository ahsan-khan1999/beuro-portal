import SelectField from "@/base-components/filter/fields/select-field";
import { DashboardFiltersToggle } from "@/enums/dashboard";
import { useOutsideClick } from "@/utils/hooks";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

export default function DashboardFilters() {
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


  return (
    <div className="flex space-x-4">
      <SelectField
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
      />
      <SelectField
        handleChange={(value) => console.log(value)}
        value=""
        dropDownIconClassName=""

        options={[
          { label: translate("dashboard_detail.months.jan"), value: "jan" },
          { label: translate("dashboard_detail.months.feb"), value: "feb" },
          { label: translate("dashboard_detail.months.mar"), value: "mar" },
          { label: translate("dashboard_detail.months.apr"), value: "apr" },
          { label: translate("dashboard_detail.months.may"), value: "may" },
          { label: translate("dashboard_detail.months.jun"), value: "jun" },
          { label: translate("dashboard_detail.months.jul"), value: "jul" },
          { label: translate("dashboard_detail.months.aug"), value: "aug" },
          { label: translate("dashboard_detail.months.sep"), value: "sep" },
          { label: translate("dashboard_detail.months.oct"), value: "oct" },
          { label: translate("dashboard_detail.months.sep"), value: "sep" },
          { label: translate("dashboard_detail.months.nov"), value: "nov" },
          { label: translate("dashboard_detail.months.dec"), value: "dec" },
        ]}
        label={translate("dashboard_detail.months.feb")}
        containerClassName="bg-white rounded-[7px] border border-[#8F8F8F80] w-[105px]"
      />
    </div>
  );
}
