import DetailFilter from "@/base-components/filter/detail-filter";
import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import useFilter from "@/hooks/filter/hook";
import { CheckBoxType, FilterType } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { SetStateAction } from "react";

export default function OffersFilters({ filter, setFilter }: { filter: FilterType, setFilter: SetStateAction<any> }) {
  const { t: translate } = useTranslation();
  const router = useRouter();

  const checkbox: CheckBoxType[] = [
    { label: translate("offers.table_functions.open"), type: "open" },
    { label: translate("offers.table_functions.signed"), type: "signed" },
    { label: translate("offers.table_functions.expire"), type: "expire" },
    { label: translate("offers.table_functions.rejected"), type: "rejected" },

  ];

  const { isOpen, setIsOpen, moreFilter, setMoreFilter, handleFilterResetToInitial, handleFilterReset, handleItemSelected, typeList } = useFilter({ filter, setFilter })

  return (
    <div className="flex flex-col xl:flex-row gap-4">
      <div className="flex gap-x-4 w-full xl:w-fit">
        {checkbox.map((item, idx) => (
          <CheckField
            checkboxFilter={filter}
            setCheckBoxFilter={setFilter}
            type={"status"}
            label={item.label}
            value={item.type}
          />
        ))}
        <InputField handleChange={(value) => setFilter({ ...filter, "text": value })} value={filter.text} />
        <SelectField
          handleChange={(value) => setFilter({ ...filter, "sortBy": value })}
          value=""
          dropDownIconClassName=""
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          options={["Date", "Latest", "Oldest", "A - Z", "Expiring Soon"]}
          label="Sort By"
        />
        <DetailFilter
          filter={filter}
          setFilter={setFilter}
          moreFilter={moreFilter}
          setMoreFilter={setMoreFilter}
          handleFilterResetToInitial={handleFilterResetToInitial}
          handleFilterReset={handleFilterReset}
          handleItemSelected={handleItemSelected}
          typeList={typeList}
        />
      </div>
     
    
    </div>
  );
}
