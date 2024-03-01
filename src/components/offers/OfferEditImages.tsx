import React from "react";
import Image from "next/image";
import LeadsDetailImgLayout from "@/layout/Leads/LeadsDetailImgLayout";
import shareIcon from "@/assets/svgs/share_icon.svg";
import imageUpload from "@/assets/svgs/img_upload.svg";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

const OfferEditImages = ({
  shareImgModal,
  handleImagesUpload,
  tabType,
  handleImageSlider,
}: {
  shareImgModal: Function;
  handleImagesUpload: (
    item: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  tabType: number;
  handleImageSlider: () => void;
}) => {
  const { images } = useAppSelector((state) => state.image);
  const { offerDetails } = useAppSelector((state) => state.offer);

  const { t: translate } = useTranslation();

  return (
    <LeadsDetailImgLayout>
      <div className={`flex flex-col h-[250px]`}>
        <div className="flex justify-between items-center ml-6 mr-[14px] my-4">
          <p className="text-lg font-normal text-[#4A13E7] ">
            {translate("offers.side_images.heading")}
          </p>
          <Image
            src={shareIcon}
            alt="shareIcon"
            className={`${
              images && images?.images?.length > 0
                ? "cursor-pointer"
                : "cursor-default"
            }  `}
            onClick={() =>
              images && images?.images?.length > 0 && shareImgModal()
            }
          />
        </div>

        {images?.images && images?.images?.length > 0 ? (
          <div className="grid max-h-[200px] overflow-y-scroll grid-cols-2 gap-[14px] p-3 border-t-4 border-[#4A13E7]">
            {images?.images?.map((item, index) => (
              <Image
                src={item}
                key={index}
                alt="leads_images"
                className="rounded-lg"
                height={106}
                width={106}
              />
            ))}
          </div>
        ) : (
          <div className="-mt-6 pb-4 h-[200px] overflow-y-scroll">
            <NoDataEmptyState />
          </div>
        )}

        <div className="flex justify-end items-center mx-[13px] pb-3">
          {/* <p
            className={`text-[12px] font-normal text-[#4A13E7] ${images && images?.images?.length > 0 ? "cursor-pointer" : "cursor-default"
              }   `}
            onClick={(e) => images && images?.images?.length > 0 && handleImagesUpload(offerDetails?.id, e)}
          >
            {translate("offers.side_images.views")}
          </p> */}
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
