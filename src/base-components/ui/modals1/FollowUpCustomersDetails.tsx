import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";

type details = {
  label: string;
  value: string;
};

const FollowUpCustomersDetails = ({ onClose }: { onClose: () => void }) => {
  const customersData: details[] = [
    {
      label: "First Name",
      value: "Rahal",
    },
    {
      label: "Last Name",
      value: "Ahmad",
    },
    {
      label: "Customer Type",
      value: "Individual",
    },
    {
      label: "Email Address",
      value: "rahal.ahmad@gmail.com",
    },
    {
      label: "Phone Number",
      value: "+49 445612 2112",
    },

    {
      label: "Mobile Number",
      value: "+49 445612 2112",
    },
  ];

  const addressData: details[] = [
    {
      label: "Street NO.",
      value: "Zweibrückenstraße, 12 ",
    },
    {
      label: "Post Code",
      value: "1234",
    },
    {
      label: "Country",
      value: "Switzerland",
    },
  ];

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="w-full max-w-[862.597px] min-h-auto max-h-fit"
      >
        <main className="relative pt-[28px] pb-[37px] px-[40px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <div className="flex flex-col">
            <h2 className="font-medium text-[18px] text-[#393939] mb-[26px]">
              Customer Details
            </h2>

            <hr className="opacity-10" />

            {/* customer details */}
            <div className="grid grid-cols-3 gap-x-3 mt-5">
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
                Address 1 Details
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
                Address 2 Details
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
