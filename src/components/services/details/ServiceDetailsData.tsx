import React from "react";
import FormCard from "@/layout/services/FormCard";
import { useRouter } from "next/router";
import Image from "next/image";
import editIcon from "@/assets/svgs/edit-customer-details.svg";
import { TRowServices } from "@/types/service";

const ServiceDetailsData = ({
  serviceDetail,
}: {
  serviceDetail: TRowServices;
}) => {
  const router = useRouter();

  return (
    <FormCard>
      <div className="flex justify-between items-center pb-5 border-b border-black border-opacity-20">
        <h2 className="text-[#393939] text-lg font-medium">
          Service/Product Details
        </h2>
        <button
          onClick={() =>
            router.push({
              pathname: "/services/edit",
              query: { service: serviceDetail?.id },
            })
          }
          className="flex  items-center gap-x-3 text-[#4B4B4B] font-medium rounded-lg border border-[#C7C7C7] py-[7px] px-4 max-w-[161px] w-full"
        >
          <Image src={editIcon} alt="editIcon" />
          Edit Details
        </button>
      </div>
      <div className="mt-5">
        <div className="flex justify-between items-center gap-3">
          <div className="w-[65%]">
            <label className="text-[#4D4D4D] mb-3 block text-sm">
              Service/Product Name
            </label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {serviceDetail?.service}
            </div>
          </div>
          <div className="w-[35%]">
            <label className="text-[#4D4D4D] mb-3 block text-sm">Unit</label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              Std.
            </div>
          </div>
        </div>
        <div className="mt-5 w-full max-w-[260px]">
          <div>
            <label className="text-[#4D4D4D] mb-3 block text-sm">Price</label>
            <div className="rounded-lg border border-[#EBEBEB] bg-white p-4  text-[#4B4B4B] font-medium">
              {serviceDetail?.price?.value}
              {serviceDetail?.price?.currency}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 w-full">
        <div>
          <label className="text-[#4D4D4D] mb-3 block text-sm">
            Description
          </label>
          <div className="rounded-lg border border-[#EBEBEB] bg-white p-3  text-[#4B4B4B] font-normal text-base">
            {serviceDetail?.description}
          </div>
        </div>
      </div>
    </FormCard>
  );
};

export default ServiceDetailsData;
