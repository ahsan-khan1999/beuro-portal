import CheckField from "@/base-components/filter/fields/check-field";
import InputField from "@/base-components/filter/fields/input-field";
import SelectField from "@/base-components/filter/fields/select-field";
import { CheckBoxType, FilterType, FiltersComponentProps } from "@/types";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import OfferFilter from "@/base-components/filter/offer-filter";
import { staticEnums } from "@/utils/static";
import { FiltersDefaultValues } from "@/enums/static";
import { useAppSelector } from "@/hooks/useRedux";

export default function OffersFilters({
  filter,
  setFilter,
  handleFilterChange,
}: FiltersComponentProps) {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const inputRef = useRef<HTMLInputElement>(null);
  const { sort, noteType, emailStatus } = router.query as any;
  const { noteSettings } = useAppSelector((state) => state.settings);
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const queryText = router.query.text;
    const textValue = Array.isArray(queryText) ? queryText[0] : queryText;
    setInputValue(textValue || "");
  }, [router.query.text]);

  const checkbox: CheckBoxType[] = [
    {
      label: translate("offers.table_functions.open"),
      type: `${staticEnums.OfferStatus.Open}`,
    },
    {
      label: translate("offers.table_functions.signed"),
      type: `${staticEnums.OfferStatus.Accepted}`,
    },
    {
      label: translate("offers.table_functions.expire"),
      type: `${staticEnums.OfferStatus.Expired}`,
    },
    {
      label: translate("offers.table_functions.rejected"),
      type: `${staticEnums.OfferStatus.Rejected}`,
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

  const hanldeMailStatus = (value?: string) => {
    const updatedQuery = { ...router.query };

    if (value === "None") {
      delete updatedQuery.emailStatus;
    } else {
      updatedQuery.emailStatus = String(value);
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
      const updatedFilter = { ...prev, ["emailStatus"]: value };
      handleFilterChange(updatedFilter);
      return updatedFilter;
    });
  };

  return (
    <div className="flex flex-col maxLargePro:flex-row maxLargePro:items-center w-full xl:w-fit gap-4">
      <div className="flex gap-[14px]">
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
      <div className="flex flex-col maxSize:flex-row gap-4 maxSize:items-center z-10">
        <div className="flex items-center gap-x-4">
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
            containerClassName="w-[225px]"
            labelClassName="w-[225px]"
            options={[
              { label: "add_note_dropdown.all_notes", value: "None" },
              ...(noteSettings
                ? noteSettings?.map((item) => ({
                    label: item.notes.noteType,
                    value: item.notes.noteType,
                  }))
                : []),
            ]}
          />
        </div>

        <div className="flex items-center gap-x-3">
          <SelectField
            handleChange={(value) => hanldeMailStatus(value)}
            value={emailStatus || "None"}
            options={[
              {
                label: "offers.card_content.email_status",
                value: "None",
              },
              {
                label: "email_status.Pending",
                value: `${staticEnums.EmailStatus.Pending}`,
              },
              {
                label: "email_status.Sent",
                value: `${staticEnums.EmailStatus.Sent}`,
              },
              {
                label: "email_status.Post",
                value: `${staticEnums.EmailStatus.Post}`,
              },
              {
                label: "email_status.Failed",
                value: `${staticEnums.EmailStatus.Failed}`,
              },
            ]}
            containerClassName="w-[160px]"
            labelClassName="w-[160px]"
          />
          <OfferFilter
            filter={filter}
            setFilter={setFilter}
            onFilterChange={handleFilterChange}
          />

          <Button
            inputType="button"
            onClick={() => router.push("/offers/add")}
            className="gap-x-2 !h-fit py-2 px-[10px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
            icon={addIcon}
            text={translate("offers.add_button")}
            id="add"
            iconAlt="add button"
          />
        </div>
      </div>
    </div>
  );
}
