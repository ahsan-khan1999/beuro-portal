import React from "react";
import Image from "next/image";
import LeadsDetailImgLayout from "@/layout/Leads/LeadsDetailImgLayout";
import leadsDetailsImg1 from "@/assets/pngs/leads_detail_img1.png";
import leadsDetailsImg2 from "@/assets/pngs/leads_detail_img2.png";
import leadsDetailsImg3 from "@/assets/pngs/leads_detail_img3.png";
import leadsDetailsImg4 from "@/assets/pngs/leads_detail_img4.png";
import shareIcon from "@/assets/svgs/share_icon.svg";
import imageUpload from "@/assets/svgs/img_upload.svg";

const OfferEditImages = ({
  shareImgModal,
  handleImagesUpload,
}: {
  shareImgModal: Function;
  handleImagesUpload: Function;
}) => {
  const leadsImgs = [
    leadsDetailsImg1,
    leadsDetailsImg2,
    leadsDetailsImg3,
    leadsDetailsImg4,
  ];

  return (
    <LeadsDetailImgLayout>
      <div className="flex flex-col">
        <div className="flex justify-between items-center ml-6 mr-[14px] my-4">
          <p className="text-lg font-normal text-[#4A13E7] ">Images</p>
          <Image
            src={shareIcon}
            alt="shareIcon"
            className="cursor-pointer"
            onClick={() => shareImgModal()}
          />
        </div>
        <div className="bg-[#4A13E7] h-1 "></div>
        <div className="grid grid-cols-2 gap-[14px] p-3">
          {leadsImgs.map((item, index) => (
            <Image
              src={item}
              key={index}
              alt="leads_images"
              className="w-[166px] rounded-lg"
            />
          ))}
        </div>

        <div className="flex justify-between items-center mx-[13px] pb-3">
          <p className="text-[12px] font-normal text-[#4A13E7] cursor-pointer  ">
            View More
          </p>
          <span
            onClick={() => handleImagesUpload()}
            className="border border-[#BFBFBF] rounded-md flex px-2 py-1 cursor-pointer "
          >
            Upload
            <Image src={imageUpload} alt="imageUpload" className="ml-2" />
          </span>
        </div>
      </div>
    </LeadsDetailImgLayout>
  );
};

export default OfferEditImages;
