import { CustomersAdmin } from "@/types/admin/customer";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import React, { useState } from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import unCheckedIcon from "@/assets/svgs/uncheck.svg";
import checkedIcon from "@/assets/svgs/checked_icon.svg";

const DetailsData = ({
  customerDetail,
  handlePreviousClick,
  handleAreYouSure,
}: {
  customerDetail: CustomersAdmin;
  handlePreviousClick: () => void;
  handleAreYouSure: () => void;
}) => {
  const { t: translate } = useTranslation();
  const [toggleSvg, setToggleSvg] = useState(true);
  const [buttonText, setButtonText] = useState("Make Account Free");

  const handleSecondSvgClick = () => {
    setToggleSvg(false);
    handleAreYouSure()
    setButtonText("Make Infinite");
  };

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
          onClick={handleSecondSvgClick}
          className="flex items-center rounded-lg border border-[#C7C7C7] px-4 py-[11px] text-[#4B4B4B] font-medium gap-3"
        >
          {toggleSvg ? (
            <Image src={unCheckedIcon} alt="unCheckedIcon" />
          ) : (
            <Image src={checkedIcon} alt="unCheckedIcon" />
          )}
          {buttonText}
        </button>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />

      <div>
        <div className="grid grid-cols-2 xl:grid-cols-5 gap-y-2">
          <h3 className="text-[#4D4D4D] ">
            {translate("admin.customers_details.card_content.customer_id")}:
            <span className="text-[#4B4B4B] font-medium ml-3">
              {customerDetail?.id}
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
              {customerDetail?.employsNumber}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            {translate("admin.customers_details.card_content.plan")}:
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {customerDetail?.plans}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            {translate(
              "admin.customers_details.card_content.subscription_date"
            )}
            :
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {customerDetail?.subscriptionDate?.toLocaleDateString()}
            </span>
          </h3>
        </div>
        <div className="mt-5 grid grid-cols-2 xl:grid-cols-4">
          <h3 className="text-[#4D4D4D] ">
            {translate("admin.customers_details.card_content.status")}:
            <span className="ml-3 text-[#4B4B4B] font-medium">
              {customerDetail?.status}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ml-[80px] flex items-center">
            {translate("admin.customers_details.card_content.company_logo")}:
            <span className="text-[#4B4B4B] font-medium ml-3">
              <Image src={customerDetail?.logo} alt="company logo" />
            </span>
          </h3>
        </div>
      </div>
    </>
  );
};

export default DetailsData;
