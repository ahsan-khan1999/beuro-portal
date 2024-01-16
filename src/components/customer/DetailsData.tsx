import { CustomerDetail } from "@/types/customer";
import Image from "next/image";
import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import { useTranslation } from "next-i18next";

const DetailsData = ({
  date,
  id,
  name,
  handlePreviousClick,
  handleDelete,
}: CustomerDetail) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <div className="flex justify-between items-center border-b border-b-[#000] border-opacity-20 pb-5">
        <div className="flex items-center">
          <div onClick={handlePreviousClick} className="cursor-pointer">
            <Image src={backIcon} alt="backIcon" />
          </div>
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {translate("customers.card_content.heading")}
          </h1>
        </div>
        <div className="flex items-center gap-x-5">
          {/* <Image src={printerIcon} alt="printerIcon" /> */}
          <span className="border-red border w-10 h-10 rounded-lg flex items-center justify-center ">
            <Image
              src={deleteIcon}
              alt="deleteIcon"
              className="cursor-pointer"
              onClick={handleDelete}
              width={16}
              height={20}
            />
          </span>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 maxSize:grid-cols-[minmax(200px,_1fr)_minmax(300px,_3fr)] items-center mt-5 gap-y-4">
          <h3 className="text-[#4D4D4D]">
            {translate("customers.card_content.customer_id")}:
            <span className="text-[#4B4B4B] font-medium">&nbsp;&nbsp;{id}</span>
          </h3>
          <div className="text-[#4D4D4D] flex gap-x-2">
            <span className="min-w-[100px]">
              {translate("customers.card_content.created_by")}:
            </span>
            <div className="text-[#4B4B4B] font-medium truncate mr-1">
              {name}
            </div>
          </div>
        </div>
        <h3 className="text-[#4D4D4D] mt-4">
          {translate("customers.card_content.created_date")}:
          <span className="text-[#4B4B4B] font-medium">&nbsp;&nbsp;{date}</span>
        </h3>
      </div>
    </>
  );
};

export default DetailsData;
