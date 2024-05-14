import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { CheckBoxType, FilterType } from "@/types";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { staticEnums } from "@/utils/static";
import { FiltersDefaultValues } from "@/enums/static";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import InvoicesFilter from "@/base-components/filter/invoices-filter";

export default function InvoicesFilters({
  filter,
  setFilter,
  handleFilterChange,
}: {
  filter: FilterType;
  setFilter: SetStateAction<any>;
  handleFilterChange: (value: FilterType) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { t: translate } = useTranslation();
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>("");

  const checkbox: CheckBoxType[] = [
    {
      label: `${translate("filters.extra_filters.pending")}`,
      type: `${staticEnums.InvoiceMainStatus.Pending}`,
    },
    {
      label: `${translate("filters.extra_filters.sending")}`,
      type: `${staticEnums.InvoiceMainStatus.sending}`,
    },
    {
      label: `${translate("filters.extra_filters.open")}`,
      type: `${staticEnums.InvoiceMainStatus.Open}`,
    },
    {
      label: `${translate("filters.extra_filters.overdue")}`,
      type: `${staticEnums.InvoiceMainStatus.Overdue}`,
    },
    {
      label: `${translate("filters.extra_filters.paid")}`,
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

  const hanldeNoteType = (value: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          page: 1,
          noteType: value,
        },
      },
      undefined,
      { shallow: false }
    );

    setFilter((prev: FilterType) => {
      const updatedFilter = { ...prev, ["noteType"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  useEffect(() => {
    const queryText = router.query.text;
    const textValue = Array.isArray(queryText) ? queryText[0] : queryText;
    setInputValue(textValue || "");
  }, [router.query.text]);

  return (
    <div className="flex flex-col xMaxProLarge:flex-row xMaxProLarge:items-center w-full xl:w-fit gap-4 z-10">
      <div className="flex gap-[14px]">
        {checkbox.map((item, idx) => (
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

      <div className="flex flex-col maxSize:flex-row gap-4 maxSize:items-center">
        <InputField
          handleChange={handleInputChange}
          ref={inputRef}
          value={inputValue}
          iconDisplay={false}
          onEnterPress={onEnterPress}
        />

        <div className="flex items-center gap-x-3">
          <SelectField
            handleChange={(value) => hanldeSortChange(value)}
            value=""
            dropDownIconClassName=""
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
                value: "customerDetial.fullName",
              },
            ]}
            label={translate("common.sort_button")}
          />
          <span className="text-[#4B4B4B] font-semibold text-base">
            {translate("global_search.notes")}
          </span>
          <SelectField
            handleChange={(value) => hanldeNoteType(value)}
            value=""
            dropDownIconClassName=""
            containerClassName="w-[225px]"
            labelClassName="w-[225px]"
            options={[
              // {
              //   value:
              //     "Sending pictures,Viewing date,Approximate Offer open,Will contact us,Individual Note,Not Reached,other",
              //   label: `${translate("add_note_dropdown.all_notes")}`,
              // },
              {
                value: "Sending pictures",
                label: `${translate("add_note_dropdown.sending_picture")}`,
              },
              {
                value: "Viewing date",
                label: `${translate("add_note_dropdown.view_date")}`,
              },
              {
                value: "Approximate Offer open",
                label: `${translate(
                  "add_note_dropdown.approximate_offer_open"
                )}`,
              },
              {
                value: "Will contact us",
                label: `${translate("add_note_dropdown.contact_us")}`,
              },
              {
                value: "Individual Note",
                label: `${translate("add_note_dropdown.individual_note")}`,
              },
              {
                value: "Not Reached",
                label: `${translate("add_note_dropdown.note_reached")}`,
              },
              {
                value: "Other",
                label: `${translate("add_note_dropdown.other")}`,
              },
            ]}
            label={translate("add_note_dropdown.all_notes")}
          />
        </div>
        <div className="flex items-center gap-x-4">
          <InvoicesFilter
            filter={filter}
            setFilter={setFilter}
            onFilterChange={handleFilterChange}
          />

          <Button
            inputType="button"
            onClick={() => router.push("/invoices/create-invoice")}
            className="gap-x-2 !h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
            text={translate("common.create_invoice")}
            id="add"
            icon={addIcon}
            iconAlt="add button"
          />
        </div>
      </div>
    </div>
  );
}
