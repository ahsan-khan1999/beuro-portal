import { CustomerDetail } from "@/types/customer";
import Image from "next/image";
import React from "react";
import backIcon from "@/assets/svgs/back_icon.svg";
import printerIcon from "@/assets/svgs/printer_icon.svg";
import deleteIcon from "@/assets/svgs/delete_icon.svg";
import { useTranslation } from "next-i18next";

const DetailsData = ({
  date,
  id,
  name,
  handlePreviousClick,
  handleDelete
}: CustomerDetail) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <div className="flex justify-between items-center  ">
        <div className="flex items-center">
          <div onClick={handlePreviousClick} className="cursor-pointer">
            <Image src={backIcon} alt="backIcon" />
          </div>
          <h1 className="text-[#4B4B4B] text-2xl font-medium ml-6">
            {translate("customers.card_content.heading")}
          </h1>
        </div>
        <div className="flex items-center gap-x-5">
          <Image src={printerIcon} alt="printerIcon" />
          <Image src={deleteIcon} alt="deleteIcon" className="cursor-pointer" onClick={handleDelete}/>
        </div>
      </div>
      <hr className="w-full h-[1px] text-black opacity-10 my-5" />
      <div>
        <div className="flex justify-between items-center max-w-[600px]">
          <h3 className="text-[#4D4D4D] ">
            {translate("customers.card_content.customer_id")}:
            <span className="text-[#4B4B4B] font-medium">&nbsp;&nbsp;{id}</span>
          </h3>
          <h3 className="text-[#4D4D4D] ">
          {translate("customers.card_content.created_by")}:
            <span className="text-[#4B4B4B] font-medium">
              &nbsp;&nbsp;{name}
            </span>
          </h3>
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
