import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { FiltersDefaultValues } from "@/enums/static";
import { CheckBoxType, FilterType, FiltersComponentProps } from "@/types";
import { staticEnums } from "@/utils/static";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export default function EmailTrackerFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t: translate } = useTranslation();
  const router = useRouter();

  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const queryText = router.query.text;
    const textValue = Array.isArray(queryText) ? queryText[0] : queryText;
    setInputValue(textValue || "");
  }, [router.query.text]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

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

  const hanldeSortChange = (value?: string) => {
    const updatedQuery = { ...router.query };

    if (value === undefined) {
      delete updatedQuery.sort;
    } else {
      updatedQuery.sort = String(value);
    }

    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
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
  const checkbox: CheckBoxType[] = [
    {
      label: `${translate("email_status.Pending")}`,
      type: `${staticEnums.MailStatus.pending}`,
    },
    {
      label: `${translate("email_status.opend")}`,
      type: `${staticEnums.MailStatus.opend}`,
    },
    {
      label: `${translate("email_status.Failed")}`,
      type: `${staticEnums.MailStatus.failed}`,
    },
  ];

  const handleEmailFilter = (value: string, isChecked: boolean) => {
    setFilter((prev: FilterType) => {
      const updatedStatus = prev.mailStatus ? [...prev.mailStatus] : [];
      const newStatus = updatedStatus.map(Number);

      if (isChecked) {
        if (!updatedStatus.includes(value)) {
          updatedStatus.push(value);
        }

        router.push(
          {
            pathname: router.pathname,
            query: {
              mailStatus:
                newStatus && newStatus.length > 0
                  ? newStatus.join(",")
                  : "None",
            },
          },
          undefined,
          { shallow: true }
        );
      } else {
        const index = updatedStatus.indexOf(value);
        if (index > -1) {
          updatedStatus.splice(index, 1);
        }
        router.push(
          {
            pathname: router.pathname,
            query: {
              mailStatus:
                newStatus && newStatus.length > 0
                  ? newStatus.join(",")
                  : "None",
            },
          },
          undefined,
          { shallow: true }
        );
      }
      const mailStatus =
        updatedStatus.length > 0 ? updatedStatus : FiltersDefaultValues.None;
      const updatedFilter = { ...prev, mailStatus: mailStatus };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div className="flex items-center gap-x-4">
      <div className="flex gap-[14px]">
        {checkbox?.map((item, idx) => (
          <CheckField
            key={idx}
            checkboxFilter={filter}
            setCheckBoxFilter={setFilter}
            type={"mailStatus"}
            label={item.label}
            value={item.type}
            onChange={(value, isChecked) => handleEmailFilter(value, isChecked)}
          />
        ))}
      </div>
      <InputField
        handleChange={handleInputChange}
        ref={inputRef}
        value={inputValue}
        iconDisplay={true}
        onEnterPress={onEnterPress}
        textClassName="w-[177px]"
      />
      <SelectField
        handleChange={(value) => hanldeSortChange(value)}
        value={
          Array.isArray(router.query.sort)
            ? router.query.sort[0]
            : router.query.sort
        }
        options={[
          {
            label: "common.sort_button",
            value: undefined,
          },
          {
            label: "filters.sort_by.date",
            value: "createdAt",
          },
          {
            label: "filters.sort_by.latest",
            value: "-createdAt",
          },
          {
            label: "filters.sort_by.oldest",
            value: "createdAt",
          },
          {
            label: "filters.sort_by.a_z",
            value: "customerDetail.fullName",
          },
        ]}
        containerClassName="w-[120px]"
        labelClassName="w-[120px]"
      />
    </div>
  );
}
