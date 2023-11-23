import React from "react";
import Image from "next/image";
import LeadsDetailImgLayout from "@/layout/Leads/LeadsDetailImgLayout";

import { Lead } from "@/types/leads";

const LeadsDetailsImages = ({
  leadDetails

}: {
  leadDetails: Lead

}) => {
 
  return (
    <LeadsDetailImgLayout>
      <div className="flex flex-col">
        <p className="text-lg font-normal text-[#4A13E7] ml-6 my-4"> Images</p>
        <div className="bg-[#4A13E7] h-1 "></div>
        <div className="grid grid-cols-2 gap-[14px] py-[18px] px-3">
          {leadDetails.images?.map((item, index) => (
            <Image src={item} key={index} alt="leads_images" height={100} width={100} className="rounded-xl "/>
          ))}
          
        </div>
      </div>
    </LeadsDetailImgLayout>
  );
};

export default LeadsDetailsImages;
