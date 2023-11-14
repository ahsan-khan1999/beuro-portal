import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import crossIcon from "@/assets/svgs/cross_icon.svg";

type details = {
  label: string;
  value: string;
};

const FollowUpServiceDetails = () => {
  const detailsData: details[] = [
    {
      label: "Required Service",
      value: "Cleaning",
    },
    {
      label: "Desire Date",
      value: "12/09/2023",
    },
    {
      label: "Contact Availability",
      value: "Morning(9am to 12am)",
    },
    {
      label: "Flexibility",
      value: "25/09 to 28/09",
    },
    {
      label: "Preferred Contact",
      value: "Via Email",
    },
    {
      label: "Budget",
      value: "Less then 1000CHF",
    },
    {
      label: "Lead Source",
      value: "Instagram",
    },
    {
      label: "Other Services",
      value: "Cleaning, Moving, Painting",
    },
  ];

  return (
    <>
      <BaseModal
        onClose={() => false}
        containerClassName="max-w-[862.597px] min-h-auto"
      >
        <div className="relative flex flex-col items-center pt-[26px] pb-[41px] pl-[31px] pr-[24px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            // onClick={onClose}
          />

          <hr className="opacity-25 mb-6" />

          <section className="grid grid-cols-3 gap-x-3">
            {detailsData.map((item, index) => (
              <div className="flex flex-col gap-y-[10px] mb-5">
                <p className="text-sm font-normal ">{item.label}</p>
                <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base">
                  {item.value}
                </span>
              </div>
            ))}
          </section>

          <section className="flex flex-col gap-y-[10px] mb-5">
            <p className="text-sm font-normal ">Additional Details</p>
            <span className="border border-[#EBEBEB] rounded-lg p-4 text-[#4B4B4B] font-medium text-base">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has a been the industry's standard dummy
              text ever since the 1500s, when an unknown printer took is galley
              of type and scrambled it to make a type specimen book. It has
              survived not only five lorm centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing.
            </span>
          </section>
        </div>
      </BaseModal>
    </>
  );
};

export default FollowUpServiceDetails;
