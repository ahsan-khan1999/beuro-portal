import SelectField from "@/base-components/filter/fields/select-field";
import { FiltersComponentProps } from "@/types";
import React from "react";

export default function DashboardFilters({
  filter,
  handleFilterChange,
  setFilter,
}: FiltersComponentProps) {
  // const [isOpen, setIsOpen] = useState({
  //   [DashboardFiltersToggle.month]: false,
  //   [DashboardFiltersToggle.week]: false,
  // });

  // const handleSelectToggle = (type: DashboardFiltersToggle) => {
  //   setIsOpen((prev) => ({
  //     ...prev,
  //     [type]: !isOpen[type],
  //   }));
  // };

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
        isSearch={false}
        options={[
          { label: "dashboard_detail.months.jan", value: "1" },
          { label: "dashboard_detail.months.feb", value: "2" },
          { label: "dashboard_detail.months.mar", value: "3" },
          { label: "dashboard_detail.months.apr", value: "4" },
          { label: "dashboard_detail.months.may", value: "5" },
          { label: "dashboard_detail.months.jun", value: "6" },
          { label: "dashboard_detail.months.jul", value: "7" },
          { label: "dashboard_detail.months.aug", value: "8" },
          { label: "dashboard_detail.months.sep", value: "9" },
          { label: "dashboard_detail.months.oct", value: "10" },
          { label: "dashboard_detail.months.nov", value: "11" },
          { label: "dashboard_detail.months.dec", value: "12" },
        ]}
        containerClassName="w-[150px]"
        labelClassName="w-[150px]"
      />
    </div>
  );
}
