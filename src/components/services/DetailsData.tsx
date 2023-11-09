import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { Service } from "@/types/service";

const DetailsData = ({
  serviceDetail,
  isUpdate,
}: {
  serviceDetail: Service;
  isUpdate: boolean;
}) => {
  const router = useRouter();
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <Image
            src={backIcon}
            alt="backIcon"
            className="cursor-pointer"
            onClick={() => router.push("/services")}
          />
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {isUpdate ? "Services Details" : "Services/Product Details"}
          </h1>
        </div>
        <div className="flex items-center gap-5">
          <Image src={printerIcon} alt="printerIcon" />
          <Image src={deleteIcon} alt="deleteIcon" />
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div>
        <div className="flex justify-between items-center max-w-[600px]">
          <h3 className="text-[#4D4D4D] ">
            Customer ID:
            <span className="text-[#4B4B4B] font-medium">
              &nbsp;&nbsp;{serviceDetail?.id}
            </span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
            Created by:
            <span className="text-[#4B4B4B] font-medium">
              &nbsp;&nbsp;{serviceDetail?.createdBy}
            </span>
          </h3>
        </div>
        {isUpdate && <h3 className="text-[#4D4D4D] mt-4">
          Creation Date:
          <span className="text-[#4B4B4B] font-medium">
            &nbsp;&nbsp;{serviceDetail?.createdOn?.toLocaleDateString()}
          </span>
        </h3>}
      </div>
    </>
  );
};

export default DetailsData;
