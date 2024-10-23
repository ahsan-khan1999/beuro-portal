import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { CheckBoxType, FilterType } from "@/types";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { staticEnums } from "@/utils/static";
import { FiltersDefaultValues } from "@/enums/static";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import InvoicesFilter from "@/base-components/filter/invoices-filter";
import { useAppSelector } from "@/hooks/useRedux";

export default function InvoicesFilters({
  filter,
  setFilter,
  handleFilterChange,
}: {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (value: FilterType) => void;
}) {
  const router = useRouter();
  const { sort, noteType } = router.query as any;
  const { t: translate } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");
  const { noteSettings } = useAppSelector((state) => state.settings);

  useEffect(() => {
    const queryText = router.query.text;
    const textValue = Array.isArray(queryText) ? queryText[0] : queryText;
    setInputValue(textValue || "");
  }, [router.query.text]);

  const checkbox: CheckBoxType[] = [
    {
      label: `${translate("common.invoice_fitlers.pending")}`,
      type: `${staticEnums.InvoiceMainStatus.Pending}`,
    },
    {
      label: `${translate("common.invoice_fitlers.sending")}`,
      type: `${staticEnums.InvoiceMainStatus.sending}`,
    },
    {
      label: `${translate("common.invoice_fitlers.open")}`,
      type: `${staticEnums.InvoiceMainStatus.Open}`,
    },
    {
      label: `${translate("common.invoice_fitlers.overdue")}`,
      type: `${staticEnums.InvoiceMainStatus.Overdue}`,
    },
    {
      label: `${translate("common.invoice_fitlers.paid")}`,
      type: `${staticEnums.InvoiceMainStatus.Paid}`,
    },
  ];

  const handleStatusChange = (value: string, isChecked: boolean) => {
    setFilter((prev: FilterType) => {
      const updatedStatus = prev.status ? [...prev.status] : [];
      const newStatus = updatedStatus.map(Number);

      if (isChecked) {
        if (!updatedStatus.includes(value)) {
          updatedStatus.push(value);
        }
        router.push(
          {
            pathname: router.pathname,
            query: {
              status:
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
              status:
                newStatus && newStatus.length > 0
                  ? newStatus.join(",")
                  : "None",
            },
          },
          undefined,
          { shallow: true }
        );
      }

      const status =
        updatedStatus.length > 0 ? updatedStatus : FiltersDefaultValues.None;
      const updatedFilter = { ...prev, status: status };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

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

    if (value === "None") {
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

  const handleNoteType = (value: string | undefined) => {
    const updatedQuery: { [key: string]: string | string[] | undefined } = {
      ...router.query,
    };

    if (value === "None") {
      delete updatedQuery.noteType;
    } else {
      updatedQuery.noteType = String(value);
    }

    updatedQuery.page = "1";

    router.push(
      {
        pathname: router.pathname,
        query: updatedQuery,
      },
      undefined,
      { shallow: true }
    );

    setFilter((prev: FilterType) => {
      const updatedFilter = { ...prev, noteType: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div className="flex flex-col xMaxProLarge:flex-row xMaxProLarge:items-center w-full xl:w-fit gap-4 z-10">
      <div className="flex gap-3">
        {checkbox?.map((item, idx) => (
          <CheckField
            key={idx}
            checkboxFilter={filter}
            setCheckBoxFilter={setFilter}
            type={"status"}
            label={item.label}
            value={item.type}
            onChange={(value, isChecked) =>
              handleStatusChange(value, isChecked)
            }
          />
        ))}
      </div>

      <div className="flex gap-3 items-center">
        <InputField
          handleChange={handleInputChange}
          ref={inputRef}
          value={inputValue}
          iconDisplay={true}
          onEnterPress={onEnterPress}
          textClassName="w-[177px]"
        />

        <div className="flex items-center gap-x-3">
          <SelectField
            handleChange={(value) => hanldeSortChange(value)}
            value={sort || "None"}
            options={[
              {
                label: "common.sort_button",
                value: "None",
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

          <SelectField
            handleChange={(value) => handleNoteType(value)}
            value={noteType || "None"}
            dropDownIconClassName=""
            containerClassName="w-[225px]"
            labelClassName="w-[225px]"
            options={[
              { label: "add_note_dropdown.all_notes", value: "None" },
              ...(noteSettings
                ? noteSettings
                    ?.slice()
                    ?.reverse()
                    ?.map((item) => ({
                      label: item.notes.noteType,
                      value: item.notes.noteType,
                    }))
                : []),
            ]}
          />
          <InvoicesFilter
            filter={filter}
            setFilter={setFilter}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
    </div>
  );
}
