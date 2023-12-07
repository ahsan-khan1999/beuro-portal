import SelectField from "@/base-components/filter/fields/select-field";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

export default function DashboardFilters() {
  const [isOpen, setIsOpen] = useState(false);
  const { t: translate } = useTranslation();

  return (
    <div className="flex space-x-4">
      <SelectField
        handleChange={(value) => console.log(value)}
        value=""
        dropDownIconClassName=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={[
          `${translate("dashboard_detail.options_labels.week")}`,
          `${translate("dashboard_detail.options_labels.month")}`,
          `${translate("dashboard_detail.options_labels.year")}`,
        ]}
        label={translate("dashboard_detail.options_labels.month")}
        containerClassName="bg-white w-[105px] h-8 rounded-[7px] border border-[#8F8F8F80]"
      />
      <SelectField
        handleChange={(value) => console.log(value)}
        value=""
        dropDownIconClassName=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={[
          `${translate("dashboard_detail.months.jan")}`,
          `${translate("dashboard_detail.months.feb")}`,
          `${translate("dashboard_detail.months.mar")}`,
          `${translate("dashboard_detail.months.apr")}`,
          `${translate("dashboard_detail.months.may")}`,
          `${translate("dashboard_detail.months.jun")}`,
          `${translate("dashboard_detail.months.jul")}`,
          `${translate("dashboard_detail.months.aug")}`,
          `${translate("dashboard_detail.months.sep")}`,
          `${translate("dashboard_detail.months.oct")}`,
          `${translate("dashboard_detail.months.nov")}`,
          `${translate("dashboard_detail.months.dec")}`,
        ]}
        label={translate("dashboard_detail.months.feb")}
        containerClassName="bg-white w-[105px] h-8 rounded-[7px] border border-[#8F8F8F80]"
      />
    </div>
  );
}
