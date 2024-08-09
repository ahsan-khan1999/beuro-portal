import React from "react";
import Image from "next/image";
import LeadsDetailImgLayout from "@/layout/Leads/LeadsDetailImgLayout";
import shareIcon from "@/assets/svgs/share_icon.svg";
import imageUpload from "@/assets/svgs/img_upload.svg";
import { useAppSelector } from "@/hooks/useRedux";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import { useTranslation } from "next-i18next";
import { combineClasses } from "@/utils/utility";
import { BlobOptions } from "buffer";

export interface DetailImgUploadProps {
  shareImgModal: (
    id: string,
    refID: string,
    name: string,
    heading: string
  ) => void;
  handleImagesUpload: (
    id: string,
    refID: string,
    name: string,
    heading: string,
    e: React.MouseEvent<HTMLSpanElement>
  ) => void;
  tabType: number;
  handleImageSlider: () => void;
  id: string;
  refID: string;
  name: string;
  heading: string;
  className?: string;
  isAgent?: boolean;
}

const OfferEditImages = ({
  shareImgModal,
  handleImagesUpload,
  tabType,
  handleImageSlider,
  id,
  name,
  refID,
  heading,
  className,
  isAgent,
}: DetailImgUploadProps) => {
  const { t: translate } = useTranslation();
  const { images } = useAppSelector((state) => state.image);

  const containerClasses = combineClasses(
    "flex flex-col max-h-[250px] w-full",
    className
  );

  return (
    <LeadsDetailImgLayout>
      <div className={containerClasses}>
        <div className="flex justify-between items-center ml-6 mr-[14px] my-3">
          <p className="text-lg font-normal text-[#4A13E7]">
            {translate("offers.side_images.heading")}
          </p>
          {images &&
            (images.images?.length > 0 ||
              images.attachments?.length > 0 ||
              images.videos?.length > 0 ||
              images.links?.length > 0) && (
              <Image
                src={shareIcon}
                alt="shareIcon"
                className="cursor-pointer"
                onClick={() => shareImgModal(id, refID, name, heading)}
              />
            )}
        </div>

        {images?.images && images?.images?.length > 0 ? (
          <div className="grid max-h-[400px] overflow-y-scroll grid-cols-2 gap-[14px] p-3 border-t-4 border-t-[#4A13E7]">
            {images?.images?.map((item, index) => {
              const isSvg = item?.endsWith(".svg");
              return (
                <>
                  {isSvg ? (
                    <object
                      data={item}
                      width={106}
                      height={106}
                      style={{ height: "106px", width: "106px" }}
                    />
                  ) : (
                    <Image
                      src={item}
                      key={index}
                      alt="leads_images"
                      className="rounded-lg"
                      height={106}
                      width={106}
                    />
                  )}
                </>
              );
            })}
          </div>
        ) : (
          <div className="pb-4 max-h-[400px] overflow-y-scroll border-t-4 border-t-[#4A13E7]">
            <NoDataEmptyState
              className="w-fit 2xl:w-[247px]"
              containerClassName="py-0 px-2"
              imgClassName="w-20 h-20"
              textClassName="text-lg text-center"
            />
          </div>
        )}

        {!isAgent && (
          <div className="flex justify-end items-center mx-[13px] pb-3">
            <span
              onClick={(e) => handleImagesUpload(id, refID, name, heading, e)}
              className={`border border-[#BFBFBF] rounded-md flex px-2 py-1 cursor-pointer`}
            >
              {translate("offers.side_images.upload_button")}
              <Image src={imageUpload} alt="imageUpload" className="ml-2" />
            </span>
          </div>
        )}
      </div>
    </LeadsDetailImgLayout>
  );
};

export default OfferEditImages;
