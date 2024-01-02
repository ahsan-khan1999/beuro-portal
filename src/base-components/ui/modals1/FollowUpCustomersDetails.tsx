import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { FollowUpCustomersDetailsProps } from "@/types/follow-up";
import { useTranslation } from "next-i18next";

type details = {
  label: string;
  value: string;
};

const FollowUpCustomersDetails = ({ onClose }: FollowUpCustomersDetailsProps) => {
  const { t: translate } = useTranslation();
  
  const customersData: details[] = [
    {
      label: `${translate("follow_up.customer_details_modal.first_name")}`,
      value: "Rahal",
    },
    {
      label: `${translate("follow_up.customer_details_modal.last_name")}`,
      value: "Ahmad",
    },
    {
      label: `${translate("follow_up.customer_details_modal.customer_type")}`,
      value: "Individual",
    },
    {
      label: `${translate("follow_up.customer_details_modal.email_address")}`,
      value: "rahal.ahmad@gmail.com",
    },
    {
      label: `${translate("follow_up.customer_details_modal.phone_number")}`,
      value: "+49 445612 2112",
    },

    {
      label: `${translate("follow_up.customer_details_modal.mobile_number")}`,
      value: "+49 445612 2112",
    },
  ];

  const addressData: details[] = [
    {
      label: `${translate("follow_up.customer_details_modal.street_no")}`,
      value: "Zweibrückenstraße, 12 ",
    },
    {
      label: `${translate("follow_up.customer_details_modal.post_code")}`,
      value: "1234",
    },
    {
      label: `${translate("follow_up.customer_details_modal.country")}`,
      value: "Switzerland",
    },
  ];

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="w-full max-w-[862.597px] min-h-auto max-h-fit"
      >
        <main className="relative pt-[26px] pb-[47px] pl-[32px] pr-[25px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <div className="flex flex-col">
            <h2 className="font-medium text-[18px] text-[#393939] mb-[26px]">
            {translate("follow_up.customer_detail_heading")}
            </h2>

            <hr className="opacity-10" />

            {/* customer details */}
            <div className="grid grid-cols-3 gap-x-3 gap-y-5 mt-5">
              {customersData.map((item, index) => (
                <div className="flex flex-col gap-y-[10px] " key={index}>
                  <p className="text-sm font-normal text-[#4D4D4D]">
                    {item.label}
                  </p>
                  <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Address 1 details */}
            <div className="flex flex-col mt-5">
              <p className="text-base font-normal text-[#8F8F8F] mb-[10px]">
              {translate("follow_up.customer_details_modal.address_one_heading")}
              </p>
              <div className="grid grid-cols-3 gap-x-3 ">
                {addressData.map((item, index) => (
                  <div className="flex flex-col gap-y-[10px] " key={index}>
                    <p className="text-sm font-normal text-[#4D4D4D]">
                      {item.label}
                    </p>
                    <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            {/* Address 2 details */}
            <div className="flex flex-col mt-5">
              <p className="text-base font-normal text-[#8F8F8F] mb-[10px]">
              {translate("follow_up.customer_details_modal.address_two_heading")}
              </p>
              <div className="grid grid-cols-3 gap-x-3 ">
                {addressData.map((item, index) => (
                  <div className="flex flex-col gap-y-[10px] " key={index}>
                    <p className="text-sm font-normal text-[#4D4D4D]">
                      {item.label}
                    </p>
                    <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </BaseModal>
    </>
  );
};

export default FollowUpCustomersDetails;
