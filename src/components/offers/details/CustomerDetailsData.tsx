import LeadsCardLayout from "@/layout/Leads/LeadsCardLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import { OffersTableRowTypes } from "@/types/offers";
import { staticEnums } from "@/utils/static";

const CustomerDetailsData = ({ offerDetails }: { offerDetails: OffersTableRowTypes }) => {
  const router = useRouter();

  return (
    <LeadsCardLayout>
      <div
        className="flex justify-between items-center pb-5 "
        id="Offer Details"
      >
        <h2 className="text-[#393939] text-lg font-medium">Customer Details</h2>
        <button
          onClick={() => router.push({
            pathname: "/offers/edit",
            query: { offer: offerDetails?.id },
          })}
          className="flex items-center gap-x-4 text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <Image src={editIcon} alt="editIcon" />
          Edit Details
        </button>
      </div>

      <hr className="opacity-20 mb-5" />
      <div className="mt-5">
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Offer Title
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {offerDetails?.title}

            </div>
          </div>
          
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Customer Type
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {offerDetails?.customerID?.customerType}
            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Your Name
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {offerDetails?.customerID?.fullName}

            </div>
          </div>
          {
            staticEnums["CustomerType"][offerDetails?.customerID?.customerType] === 1 &&
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                Company Name
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {offerDetails?.customerID?.companyName}

              </div>
            </div>
          }
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Email Address
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {offerDetails?.customerID?.email}

            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Phone Number
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {offerDetails?.customerID?.phoneNumber}

            </div>
          </div>
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Mobile Number
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {offerDetails?.customerID?.mobileNumber}

            </div>
          </div>
        </div>

        <div className="mt-5">
          <h4 className="text-[#8F8F8F] mb-[10px]">Address Details</h4>
          <div className="grid grid-cols-3 gap-x-3">
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                Street NO.
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {offerDetails?.customerID?.address?.streetNumber}

              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                Post Code
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {offerDetails?.customerID?.address?.postalCode}

              </div>
            </div>
            <div>
              <label className="text-[#4D4D4D] mb-3 block text-sm">
                Country
              </label>
              <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
                {offerDetails?.customerID?.address?.country}

              </div>
            </div>
          </div>
        </div>
      </div>
    </LeadsCardLayout >
  );
};

export default CustomerDetailsData;
