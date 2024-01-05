import { CustomersAdmin } from "@/types/admin/customer";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { useState } from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import unCheckedIcon from "@/assets/svgs/uncheck.svg";
import checkedIcon from "@/assets/svgs/checked_icon.svg";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { DropDownItem } from "@/types";
import { formatDateTimeToDate } from "@/utils/utility";

const DetailsData = ({
  customerDetail,
  isCustomerFree,
  handlePreviousClick,
  handleAreYouSure,
  handleStatusChange,
}: {
  customerDetail: CustomersAdmin;
  isCustomerFree: boolean;
  handlePreviousClick: () => void;
  handleAreYouSure: () => void;
  handleStatusChange: (value: string) => void;
}) => {
  const { t: translate } = useTranslation();

  const items: DropDownItem[] = [
    {
      item: "unBlock",
    },
    {
      item: "block",
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <div onClick={handlePreviousClick} className="cursor-pointer">
            <Image src={backIcon} alt="backIcon" />
          </div>
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {translate("admin.customers_details.card_content.main_heading")}
          </h1>
        </div>
        <button
          onClick={handleAreYouSure}
          className="flex items-center rounded-lg border border-[#C7C7C7] px-4 py-[11px] text-[#4B4B4B] font-medium gap-3"
        >
          {!isCustomerFree ? (
            <Image src={unCheckedIcon} alt="unCheckedIcon" />
          ) : (
            <Image src={checkedIcon} alt="CheckedIcon" />
          )}
          {isCustomerFree
            ? `${translate(
                "admin.customers_details.card_content.make_button_checked"
              )}`
            : `${translate(
                "admin.customers_details.card_content.make_button_unchecked"
              )}`}
        </button>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />

      <div>
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-y-2">
          <h3 className="text-[#4D4D4D] ">
            {translate("admin.customers_details.card_content.customer_id")}:
            <span className="text-[#4B4B4B] font-medium ml-3">
              {customerDetail?.refID}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            {translate("admin.customers_details.card_content.role")}:
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {customerDetail?.role}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            {translate("admin.customers_details.card_content.no_of_employee")}:
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {customerDetail?.employee?.employeeID}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            {translate("admin.customers_details.card_content.plan")}:
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {customerDetail?.company?.plan}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            {translate(
              "admin.customers_details.card_content.subscription_date"
            )}
            :
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {formatDateTimeToDate(customerDetail?.createdAt)}
            </span>
          </h3>
        </div>
        <div className="mt-5 grid grid-cols-2 xl:grid-cols-4">
          <h3 className="text-[#4D4D4D] flex items-center">
            {translate("admin.customers_details.card_content.status")}:
            <span className="ml-3 text-[#4B4B4B] font-medium">
              <DropDown
                items={items}
                onItemSelected={(selectedItem) =>
                  handleStatusChange(selectedItem)
                }
                selectedItem={customerDetail?.status}
                dropDownClassName="w-[140px] border border-primary"
                dropDownTextClassName="text-primary font-medium"
                dropDownIconClassName="text-primary"
                dropDownItemsContainerClassName="border border-primary"
              />
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ml-[80px] flex items-center">
            {translate("admin.customers_details.card_content.company_logo")}:
            <span className="text-[#4B4B4B] font-medium ml-3">
              <Image
                src={customerDetail?.company?.logo}
                alt="company logo"
                height={40}
                width={100}
              />
            </span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default DetailsData;
