import InputField from "@/base-components/filter/fields/input-field";
import { AppointmentTableFunction, FilterType } from "@/types";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FiltersDefaultValues } from "@/enums/static";
import { CustomDatePciker } from "@/base-components/ui/custom-date-picker";

export default function MobileLeadsFilters({
  filter,
  setFilter,
  handleFilterChange,
  currentDate,
  onDateChange,
}: AppointmentTableFunction) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const queryText = router.query.text;
    const textValue = Array.isArray(queryText) ? queryText[0] : queryText;
    setInputValue(textValue || "");
  }, [router.query.text]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  // const checkbox: CheckBoxType[] = [
  //   {
  //     label: translate("leads.table_functions.open"),
  //     type: `${staticEnums.LeadStatus.Open}`,
  //   },
  //   {
  //     label: translate("leads.table_functions.inProcess"),
  //     type: `${staticEnums.LeadStatus.InProcess}`,
  //   },
  //   {
  //     label: translate("leads.table_functions.close"),
  //     type: `${staticEnums.LeadStatus.Close}`,
  //   },
  //   {
  //     label: translate("leads.table_functions.expire"),
  //     type: `${staticEnums.LeadStatus.Expired}`,
  //   },
  // ];

  // const handleStatusChange = (value: string, isChecked: boolean) => {
  //   setFilter((prev: FilterType) => {
  //     const updatedStatus = prev.status ? [...prev.status] : [];
  //     const newStatus = updatedStatus;

  //     if (isChecked) {
  //       if (!updatedStatus.includes(value)) {
  //         updatedStatus.push(value);
  //       }

  //       router.push(
  //         {
  //           pathname: router.pathname,
  //           query: {
  //             status:
  //               newStatus && newStatus.length > 0
  //                 ? newStatus.join(",")
  //                 : "None",
  //           },
  //         },
  //         undefined,
  //         { shallow: true }
  //       );
  //     } else {
  //       const index = updatedStatus.indexOf(value);
  //       if (index > -1) {
  //         updatedStatus.splice(index, 1);
  //       }

  //       router.push(
  //         {
  //           pathname: router.pathname,
  //           query: {
  //             status:
  //               newStatus && newStatus.length > 0
  //                 ? newStatus.join(",")
  //                 : "None",
  //           },
  //         },
  //         undefined,
  //         { shallow: true }
  //       );
  //     }

  //     const status =
  //       updatedStatus.length > 0 ? updatedStatus : FiltersDefaultValues.None;
  //     const updatedFilter = { ...prev, status: status };

  //     handleFilterChange(updatedFilter);
  //     return updatedFilter;
  //   });
  // };

  const onEnterPress = () => {
    let inputValue = inputRef?.current?.value;

    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          text: inputValue,
        },
      },
      undefined,
      { shallow: false }
    );

    if (inputValue === "") {
      inputValue = FiltersDefaultValues.None;
    }

    setFilter((prev: FilterType) => {
      const updatedValue = { ...prev, ["text"]: inputValue };
      handleFilterChange(updatedValue);
      return updatedValue;
    });
  };

  const hanldeSortChange = (value: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          sort: value,
        },
      },
      undefined,
      { shallow: false }
    );

    setFilter((prev: FilterType) => {
      const updatedFilter = { ...prev, ["sort"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-base font-medium text-[#1E1E1E]">Leads</h1>
        <div className="w-[200px]">
          <CustomDatePciker
            id="today"
            name="today"
            value={currentDate}
            onInputChange={onDateChange}
          />
        </div>
        {/* <SelectField
          handleChange={(value) => hanldeSortChange(value)}
          value=""
          options={[
            {
              label: `${translate("filters.sort_by.date")}`,
              value: "createdAt",
            },
            {
              label: `${translate("filters.sort_by.latest")}`,
              value: "-createdAt",
            },
            {
              label: `${translate("filters.sort_by.oldest")}`,
              value: "createdAt",
            },
            {
              label: `${translate("filters.sort_by.a_z")}`,
              value: "customerDetail.fullName",
            },
          ]}
          label={translate("common.sort_button")}
          containerClassName="z-10"
        /> */}
      </div>

      <InputField
        handleChange={handleInputChange}
        ref={inputRef}
        value={inputValue}
        iconDisplay={true}
        onEnterPress={onEnterPress}
        textClassName="w-full rounded-full"
        containerClassName="w-full"
        inputDivClassName="w-full"
      />
    </div>
  );
}
