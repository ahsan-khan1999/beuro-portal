import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { SelectMonthProps } from "@/types/admin/payments";
import React, { useState } from "react";

export default function PaymentsFilter({
  handleSelectMonth,
}: SelectMonthProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex space-x-4">
      <button
        onClick={handleSelectMonth}
        className="flex items-center px-3 py-2 bg-white rounded-md gap-x-1"
      >
        Download History
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 21 21"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.7676 4.50391C11.1124 4.50391 11.3919 4.78344 11.3919 5.12826V11.1131L13.4478 9.05722C13.6917 8.81339 14.087 8.81339 14.3308 9.05722C14.5746 9.30104 14.5746 9.69636 14.3308 9.94018L11.2091 13.0619C10.9652 13.3057 10.5699 13.3057 10.3261 13.0619L7.20435 9.94018C6.96053 9.69636 6.96053 9.30104 7.20435 9.05722C7.44818 8.81339 7.84349 8.81339 8.08731 9.05722L10.1432 11.1131V5.12826C10.1432 4.78344 10.4228 4.50391 10.7676 4.50391ZM5.77279 12.6204C6.1176 12.6204 6.39714 12.9 6.39714 13.2448V14.4935C6.39714 14.6591 6.46291 14.8179 6.58 14.935C6.69709 15.0521 6.8559 15.1178 7.02148 15.1178H14.5137C14.6793 15.1178 14.8381 15.0521 14.9552 14.935C15.0722 14.8179 15.138 14.6591 15.138 14.4935V13.2448C15.138 12.9 15.4176 12.6204 15.7624 12.6204C16.1072 12.6204 16.3867 12.9 16.3867 13.2448V14.4935C16.3867 14.9903 16.1894 15.4667 15.8381 15.8179C15.4869 16.1692 15.0104 16.3665 14.5137 16.3665H7.02148C6.52472 16.3665 6.0483 16.1692 5.69704 15.8179C5.34578 15.4667 5.14844 14.9903 5.14844 14.4935V13.2448C5.14844 12.9 5.42797 12.6204 5.77279 12.6204Z"
            fill="#4B4B4B"
          />
        </svg>
      </button>
      <InputField handleChange={(value) => console.log(value)} value="" options={[]}/>
      <SelectField
        handleChange={(value) => console.log(value)}
        value=""
        dropDownIconClassName=""

        options={[{ label: "1", value: "1" }, { label: "2", value: "2" }, { label: "2", value: "2" }, { label: "2", value: "2" }, { label: "2", value: "2" }]}
        label="Sort By"
      />
    </div>
  );
}
