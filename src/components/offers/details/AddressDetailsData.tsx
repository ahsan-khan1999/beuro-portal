import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import { useRouter } from "next/router";
import React from "react";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import Image from "next/image";

const AddressDetailsData = () => {
  const router = useRouter();

  return (
    <LeadsCardLayout>
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">Address Details</h2>
        <button
          onClick={() => router.push("/offers/edit")}
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <Image src={editIcon} alt="editIcon" />
          Edit Details
        </button>
      </div>

      <div className="mt-5">
        <h4 className="text-[#8F8F8F] mb-[10px]">Address 1 Details</h4>
        <div className="grid grid-cols-3 gap-x-3">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Street NO.
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              Zweibrückenstraße, 12
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Post Code
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              1234
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">Country</label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              Switzerland
            </div>
          </div>
        </div>

        <div className="mt-5 w-full">
          <label className="text-[#4D4D4D] mb-[10px] block text-sm">
            Description
          </label>
          <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has a been the industry's standard dummy text
            ever since the 1500s
          </div>
        </div>
      </div>
      <div className="mt-5">
        <h4 className="text-[#8F8F8F] mb-[10px]">Address 2 Details</h4>
        <div className="grid grid-cols-3 gap-x-3">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Street NO.
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              Zweibrückenstraße, 12
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Post Code
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              1234
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">Country</label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              Switzerland
            </div>
          </div>
        </div>

        <div className="mt-5 w-full">
          <label className="text-[#4D4D4D] mb-[10px] block text-sm">
            Description
          </label>
          <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has a been the industry's standard dummy text
            ever since the 1500s
          </div>
        </div>
      </div>
    </LeadsCardLayout>
  );
};

export default AddressDetailsData;
