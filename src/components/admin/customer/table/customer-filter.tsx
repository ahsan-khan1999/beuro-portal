import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { CheckBoxType } from "@/types";
import { Status } from "@/types/global";
import { useTranslation } from "next-i18next";
import React, { useState } from "react";

export default function CustomerFilter() {
  const [checkboxFilter, setCheckBoxFilter] = useState<Status>({
    active: true,
    blocked: false,
  });
  const { t: translate } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const checkbox: CheckBoxType[] = [
    {
      label: `${translate("admin.customers_details.table_functions.active")}`,
      type: "active",
    },
    {
      label: `${translate("admin.customers_details.table_functions.block")}`,
      type: "blocked",
    },
  ];
  return (
    <div className="flex space-x-4">
      <div className="flex gap-x-4 w-full xl:w-fit">

      {checkbox.map((item, idx) => (
        <CheckField
          checkboxFilter={checkboxFilter}
          setCheckBoxFilter={setCheckBoxFilter}
          type={item.type}
          label={item.label}
        />
      ))}
      </div>
      <InputField handleChange={(value) => console.log(value)} value="" />
      <SelectField
        handleChange={(value) => console.log(value)}
        value=""
        dropDownIconClassName=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={["1", "2", "2", "2", "2"]}
        label={translate("admin.customers_details.table_functions.sort")}
      />
    </div>
  );
}
