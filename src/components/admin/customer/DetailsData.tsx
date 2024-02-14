import { CustomersAdmin } from "@/types/admin/customer";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { useState } from "react";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { DropDownItem } from "@/types";
import { formatDateTimeToDate } from "@/utils/utility";
import userIcon from "@/assets/svgs/Group 48095860.svg";

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

  const customerStatus = [
    `${translate("customer_status.unBlock")}`,
    `${translate("customer_status.block")}`,
  ];

  const items: DropDownItem[] = [
    {
      item: {
        label: customerStatus[0],
        value: "unBlock",
      },
    },
    {
      item: {
        label: customerStatus[1],
        value: "block",
      },
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <div onClick={handlePreviousClick} className="cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="41"
              height="40"
              viewBox="0 0 41 40"
              fill="none"
            >
              <rect
                x="0.750977"
                y="0.5"
                width="39.2105"
                height="39"
                rx="7.5"
                fill="white"
                stroke="#4A13E7"
              />
              <path
                d="M23.7911 13.2658C23.975 13.4498 24.0783 13.6993 24.0783 13.9594C24.0783 14.2196 23.975 14.4691 23.7911 14.6531L18.9346 19.5095L23.7911 24.366C23.9698 24.551 24.0687 24.7989 24.0664 25.0561C24.0642 25.3134 23.961 25.5594 23.7791 25.7413C23.5972 25.9232 23.3511 26.0264 23.0939 26.0287C22.8366 26.0309 22.5888 25.932 22.4038 25.7533L16.8537 20.2032C16.6697 20.0192 16.5664 19.7697 16.5664 19.5095C16.5664 19.2494 16.6697 18.9999 16.8537 18.8159L22.4038 13.2658C22.5878 13.0818 22.8373 12.9785 23.0974 12.9785C23.3576 12.9785 23.6071 13.0818 23.7911 13.2658Z"
                fill="#4A13E7"
              />
            </svg>
          </div>
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {translate("admin.customers_details.card_content.main_heading")}
          </h1>
        </div>
        {/* <button
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
        </button> */}
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />

      <div>
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-y-2">
          <h3 className="text-[#4D4D4D] ">
            {translate("admin.customers_details.card_content.customer_id")}:
            <span className="text-[#4B4B4B] font-medium ml-3">
              {customerDetail?.company?.refID}
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
              {customerDetail?.plan?.numberOfEmployees}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            {translate("admin.customers_details.card_content.plan")}:
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {customerDetail?.plan?.planName}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            {translate(
              "admin.customers_details.card_content.subscription_date"
            )}
            :
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {formatDateTimeToDate(customerDetail?.plan?.createdAt)}
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
                dropDownClassName="w-[140px] border border-primary justify-between"
                dropDownTextClassName="text-primary font-medium"
                dropDownIconClassName="text-primary"
                dropDownItemsContainerClassName="border border-primary w-full"
              />
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] flex items-center">
            {translate("admin.customers_details.card_content.company_logo")}:
            <span className="text-[#4B4B4B] font-medium ml-3">
              <Image
                src={customerDetail?.company?.logo || userIcon}
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
