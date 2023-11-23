import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import React from "react";
import { ComponentsType } from "./LeadsDetailsData";
import editIcon from "@/assets/svgs/edit-customer-details.svg"
import Image from "next/image";
import { Lead } from "@/types/leads";
import { useAppSelector } from "@/hooks/useRedux";

const AddressDetailsData = ({ onClick }: {
  onClick: (index: number, component: ComponentsType) => void,

}) => {
  const { leadDetails } = useAppSelector(state => state.lead)

  return (
    <LeadsCardLayout>
      <div className="flex justify-between items-center pb-5 " id="Address Details">
        <h2 className="text-[#393939] text-lg font-medium">Address Details</h2>
        <button
          onClick={() => onClick(1, ComponentsType.addressEdit)}
          className="flex  gap-x-4 items-center text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <Image src={editIcon} alt="editIcon" />
          Edit Details
        </button>
      </div>
      <hr className="opacity-20 mb-5" />

      {
        leadDetails?.addressID?.address?.map((item, key) => (
          <div className="mt-5">
            <h4 className="text-[#8F8F8F] mb-[10px]">Address {key+1} Details</h4>
            <div className="grid grid-cols-3 gap-x-3">
              <div>
                <label className="text-[#4D4D4D] mb-3 block text-sm">
                  Street NO.
                </label>
                <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                  {item?.streetNumber}
                </div>
              </div>
              <div>
                <label className="text-[#4D4D4D] mb-3 block text-sm">
                  Post Code
                </label>
                <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                  {item?.postalCode}

                </div>
              </div>
              <div>
                <label className="text-[#4D4D4D] mb-3 block text-sm">Country</label>
                <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                  {item?.country}

                </div>
              </div>
            </div>

            <div className="mt-5 w-full">
              <label className="text-[#4D4D4D] mb-[10px] block text-sm">
                Description
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {item?.description}

              </div>
            </div>
          </div>

        ))
      }

    </LeadsCardLayout>
  );
};

export default AddressDetailsData;
