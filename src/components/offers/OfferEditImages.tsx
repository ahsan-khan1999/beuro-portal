import React from "react";
import Image from "next/image";
import LeadsDetailImgLayout from "@/layout/Leads/LeadsDetailImgLayout";
import leadsDetailsImg1 from "@/assets/pngs/leads_detail_img1.png";
import leadsDetailsImg2 from "@/assets/pngs/leads_detail_img2.png";
import leadsDetailsImg3 from "@/assets/pngs/leads_detail_img3.png";
import leadsDetailsImg4 from "@/assets/pngs/leads_detail_img4.png";
import shareIcon from "@/assets/svgs/share_icon.svg";
import imageUpload from "@/assets/svgs/img_upload.svg";
import { OffersTableRowTypes } from "@/types/offers";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";

const OfferEditImages = ({
  shareImgModal,
  handleImagesUpload,
  tabType,
  handleImageSlider
}: {
  shareImgModal: Function;
  handleImagesUpload: (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  tabType: number;
  handleImageSlider: () => void
}) => {
  const offersImgs = [
    leadsDetailsImg1,
    leadsDetailsImg2,
    leadsDetailsImg3,
    leadsDetailsImg4,
  ];
  const { offerDetails } = useAppSelector(state => state.offer)

  const { t: translate } = useTranslation();
  return (
    <LeadsDetailImgLayout>
      <div className="flex flex-col">
        <div className="flex justify-between items-center ml-6 mr-[14px] my-4">
          <p className="text-lg font-normal text-[#4A13E7] ">
            {translate("offers.side_images.heading")}
          </p>
          <Image
            src={shareIcon}
            alt="shareIcon"
            className={`${offerDetails?.images?.length > 0 ? 'cursor-pointer' : 'cursor-default'}  `}
            onClick={() => offerDetails?.images?.length > 0 && shareImgModal()}
          />
        </div>
        <div className="bg-[#4A13E7] h-1 "></div>
        <div className="grid grid-cols-2 gap-[14px] p-3">
          {offerDetails?.images?.map((item, index) => (
            <Image
              src={item}
              key={index}
              alt="leads_images"
              className="w-[166px] rounded-lg"
              height={106}
              width={106}
            />
          ))}
        </div>

        <div className="flex justify-between items-center mx-[13px] pb-3">
          <p className={`text-[12px] font-normal text-[#4A13E7] ${offerDetails?.images?.length > 0 ? 'cursor-pointer' : 'cursor-default'}   `} onClick={() => offerDetails?.images?.length > 0 && handleImageSlider()}>
            {translate("offers.side_images.views")}
          </p>
          <span
            onClick={(e) => handleImagesUpload(offerDetails?.id, e)}
            className={`border border-[#BFBFBF] rounded-md flex px-2 py-1 cursor-pointer `}
          >
            {translate("offers.side_images.upload_button")}
            <Image src={imageUpload} alt="imageUpload" className="ml-2" />
          </span>
        </div>
      </div>
    </LeadsDetailImgLayout>
  );
};

export default OfferEditImages;
