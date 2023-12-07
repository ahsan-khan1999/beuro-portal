import DetailFilter from "@/base-components/filter/detail-filter";
import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import useFilter from "@/hooks/filter/hook";
import { CheckBoxType, FilterType } from "@/types";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { SetStateAction, useState } from "react";
import addIcon from "@/assets/svgs/plus_icon.svg";

export default function LeadsFilter({ filter, setFilter }: { filter: FilterType, setFilter: SetStateAction<any> }) {
  const { t: translate } = useTranslation();
  const router = useRouter()
  // const [isOpen, setIsOpen] = useState(false);
  const checkbox: CheckBoxType[] = [
    { label: translate("leads.table_functions.open"), type: "open" },
    { label: translate("leads.table_functions.close"), type: "close" },
    { label: translate("leads.table_functions.expire"), type: "expire" },
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
      <InputField handleChange={(value) => console.log(value)} value="" />
      <SelectField
        handleChange={(value) => console.log(value)}
        value=""
        dropDownIconClassName=""
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        options={["1", "2", "2", "2", "2"]}
        label="Sort By"
      />
      <button
        onClick={() => router.push("/leads/add")}
        className="flex gap-x-2 items-center px-3 py-2 w-fit text-[13px] font-semibold hover:bg-[#7B18FF] bg-primary text-white rounded-md "
      >
        <Image src={addIcon} alt="addIcon" />
        {translate("leads.add_button")}
      </button>
    </div>
  );
}
