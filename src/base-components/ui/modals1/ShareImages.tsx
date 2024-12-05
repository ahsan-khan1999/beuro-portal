import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { CopyField } from "../copy-field";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import pdfIcon from "@/assets/svgs/PDF_file_icon.svg";
import { BaseButton } from "../button/base-button";
import { ImagePreview } from "./image-preview";
import { DownloadIcon } from "@/assets/svgs/components/download-icon";
import { useShareImages } from "@/hooks/modals/useShareImages";
import { useAppSelector } from "@/hooks/useRedux";
import { ShareImagesProps } from "@/types/global";
import { hasData } from "@/utils/utility";

export const ShareImages = ({ onClose, id, type }: ShareImagesProps) => {
  const {
    translate,
    activeTab,
    handleTabChange,
    attachementTabs,
    loading,
    loadingGlobal,
    isOpenedFile,
    images,
  } = useShareImages();

  const { refID, name, heading } = useAppSelector(
    (state) => state.global.modal.data
  );

  console.log(images, "images");

  const handleFileLink = (fileName: string) => {
    window.open(fileName);
  };

  const attachementLookUp = {
    img_tab: (
      <>
        {images?.images && images?.images?.length > 0 ? (
          <ImagePreview images={images?.images} />
        ) : (
          <NoDataEmptyState
            className="w-full"
            containerClassName="py-5 xMini:px-0"
            textClassName="text-lg xMini:text-2xl"
            imgClassName="w-20 h-20 xMini:w-fit xMini:h-fit"
          />
        )}
      </>
    ),
    video_tab: (
      <>
        {images?.videos && images?.videos?.length > 0 ? (
          <div className="grid grid-cols-2 gap-[14px] max-h-[250px] overflow-y-scroll">
            {images?.videos &&
              images?.videos?.map((item, index) => (
                <video controls poster="poster.jpg" key={index}>
                  <source src={item} type="video/mp4" />
                </video>
              ))}
          </div>
        ) : (
          <NoDataEmptyState
            className="w-full"
            containerClassName="py-5 xMini:px-0"
            textClassName="text-lg xMini:text-2xl"
            imgClassName="w-20 h-20 xMini:w-fit xMini:h-fit"
          />
        )}
      </>
    ),
    attachement_tab: (
      <>
        {images?.attachments && images?.attachments?.length > 0 ? (
          <div className="grid grid-cols-2 gap-[14px] max-h-[250px] overflow-y-scroll">
            {images?.attachments?.map((item, index) => (
              <div className="flex items-center gap-x-3" key={index}>
                <div
                  className={`relative flex flex-col gap-3 h-fit border border-[#EBEBEB] rounded-md px-3 py-2 truncate ${
                    isOpenedFile ? "cursor-pointer" : "cursor-default"
                  }`}
                  key={index}
                >
                  <div
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(item, "_blank");
                    }}
                  >
                    <Image src={pdfIcon} alt="pdfIcon" />
                    <span>{item?.slice(0, 20)}...</span>
                  </div>
                </div>
                <DownloadIcon onClick={() => handleFileLink(item)} />
              </div>
            ))}
          </div>
        ) : (
          <NoDataEmptyState
            className="w-full"
            containerClassName="py-5 xMini:px-0"
            textClassName="text-lg xMini:text-2xl"
            imgClassName="w-20 h-20 xMini:w-fit xMini:h-fit"
          />
        )}
      </>
    ),
    link_tab: (
      <>
        {images?.links && images?.links?.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-[14px] max-h-[250px] overflow-y-scroll">
            {images?.links?.map((item, index) => (
              <div
                key={index}
                className="border-2 border-lightGray rounded-lg px-4 py-2"
              >
                <p
                  onClick={() => window.open(item, "_blank")}
                  className="text-base font-normal text-primary truncate select-none cursor-pointer"
                >
                  {item}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <NoDataEmptyState
            className="w-full"
            containerClassName="py-5 xMini:px-0"
            textClassName="text-lg xMini:text-2xl"
            imgClassName="w-20 h-20 xMini:w-fit xMini:h-fit"
          />
        )}
      </>
    ),
  };

  const handleShare = () => {
    window.open(
      `https://api.whatsapp.com/send?text=https://portal.buero-365.com/document-viewer?${type}=${id}`,
      "_blank"
    );
  };

  console.log(images?.videos?.length, "videos");

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[480px] xl:max-w-[624px] min-h-[500px]"
    >
      <div className="relative flex flex-col px-[26px] pt-5 pb-[36px]">
        <Image
          src={crossIcon}
          alt="cross_icon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />

        <p className="font-medium text-base md:text-2xl">
          {translate("offers.share_images_modal.heading")}
        </p>

        <div className="border-y border-y-[#000] border-opacity-10 py-[10px] my-5">
          <div className="flex items-center gap-x-[34px]">
            <div className="flex items-center gap-x-[14px]">
              <span className="text-sm font-normal text-[#4D4D4D]">ID:</span>
              <span className="text-sm font-medium text-primary">{refID}</span>
            </div>
            <div className="flex items-center gap-x-[14px]">
              <span className="text-sm font-normal text-[#4D4D4D]">
                {heading}:
              </span>
              <span className="text-sm font-medium text-primary">{name}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-x-6 border-b-2 border-[#E5E5E5]">
          {attachementTabs?.map((item, index) => {
            const isActive = activeTab === item;
            const hasTabData = hasData(item, images, true);

            return (
              <button
                key={index}
                className={`
                   ${
                     isActive
                       ? hasTabData
                         ? "text-[#45C769]"
                         : "text-primary"
                       : hasTabData
                       ? "text-[#45C769]"
                       : "text-[#393939]"
                   }
                  text-base font-medium pb-[10px] 
                  ${isActive ? "border-b-2 border-primary" : ""}
                `}
                onClick={() => handleTabChange(item)}
              >
                {translate(`common.images_modal.${item}`)}
              </button>
            );
          })}
        </div>

        <div className="my-5">
          {attachementLookUp[activeTab as keyof typeof attachementLookUp]}
        </div>

        <p className="text-lg font-medium mb-3">
          {translate("common.share_on_whatsapp")}
        </p>
        <CopyField
          value={`https://portal.buero-365.com/document-viewer?${type}=${id}`}
        />

        <div className="flex justify-end mt-5">
          <BaseButton
            buttonText={translate("common.share")}
            containerClassName="rounded-lg px-4 min-w-[202px] flex justify-center align-middle items-center h-[50px] bg-primary hover:bg-buttonHover"
            textClassName="text-white"
            onClick={handleShare}
            loading={loading || loadingGlobal}
            disabled={loadingGlobal}
          />
        </div>
      </div>
    </BaseModal>
  );
};
