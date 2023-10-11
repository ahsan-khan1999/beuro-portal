import React from "react";
import Image from "next/image";
import LeadsDetailImgLayout from "@/layout/Leads/LeadsDetailImgLayout";
import leadsDetailsImg1 from "@/assets/pngs/leads_detail_img1.png";
import leadsDetailsImg2 from "@/assets/pngs/leads_detail_img2.png";
import leadsDetailsImg3 from "@/assets/pngs/leads_detail_img3.png";
import leadsDetailsImg4 from "@/assets/pngs/leads_detail_img4.png";

const LeadsDetailsImages = () => {
  //   const leadsImgs = [
  //     "@/assets/pngs/leads_detail_img1.png",
  //     "@/assets/pngs/leads_detail_img2.png",
  //     "@/assets/pngs/leads_detail_img3.png",
  //     "@/assets/pngs/leads_detail_img4.png",
  //   ];

  return (
    <LeadsDetailImgLayout>
      <div className="flex flex-col">
        <p className="text-lg font-normal text-[#4A13E7] ml-6 my-4"> Images</p>
        <div className="bg-[#4A13E7] h-1 "></div>
        <div className="grid grid-cols-2 gap-[14px] py-[18px] px-3">
          {/* {leadsImgs.map((item, index) => (
            <Image src={item} key={index} alt="leads_images" className="w-[166px]"/>
          ))} */}
          <Image
            src={leadsDetailsImg1}
            alt="leads_img"
            className="rounded-xl"
          />
          <Image
            src={leadsDetailsImg2}
            alt="leads_img"
            className="rounded-xl"
          />
          <Image
            src={leadsDetailsImg3}
            alt="leads_img"
            className="rounded-xl"
          />
          <Image
            src={leadsDetailsImg4}
            alt="leads_img"
            className="rounded-xl"
          />
        </div>
      </div>
    </LeadsDetailImgLayout>
  );
};

export default LeadsDetailsImages;
