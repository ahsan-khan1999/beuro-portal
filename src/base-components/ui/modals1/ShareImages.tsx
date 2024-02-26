import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { CopyField } from "../copy-field";
import { useAppSelector } from "@/hooks/useRedux";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import pdfIcon from "@/assets/svgs/PDF_file_icon.svg";
import { BaseButton } from "../button/base-button";
import { DownloadIcon } from "@/assets/svgs/components/download-icon";
import { useShareImages } from "@/hooks/modals/useShareImages";

export const ShareImages = ({
  onClose,
  handleImageSlider,
  offerId,
}: {
  onClose: () => void;
  handleImageSlider: Function;
  offerId: string;
}) => {
  const {
    translate,
    activeTab,
    handleTabChange,
    attachementTabs,
    loading,
    loadingGlobal,
    isOpenedFile,
  } = useShareImages(handleImageSlider);

  const handleFileLink = (fileName: string) => {
    window.open(fileName);
  };

  const { images } = useAppSelector((state) => state.image);
  const attachementLookUp = {
    img_tab: (
      <>
        {images?.images && images?.images?.length > 0 ? (
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-[14px] max-h-[500px] overflow-scroll">
            {images?.images?.map((item, index) => (
              <Image
                src={item}
                key={index}
                alt="leads_images"
                className="w-full h-auto rounded-lg"
                height={106}
                width={106}
              />
            ))}
          </div>
        ) : (
          <div className="-mt-6 pb-4">
            <NoDataEmptyState />
          </div>
        )}
      </>
    ),
    video_tab: (
      <>
        {images?.videos && images?.videos?.length > 0 ? (
          <div className="grid grid-cols-2 gap-[14px] max-h-[500px] overflow-y-scroll">
            {images?.videos &&
              images?.videos?.map((item, index) => (
                <video controls poster="poster.jpg" key={index}>
                  <source src={item} type="video/mp4" />
                </video>
              ))}
          </div>
        ) : (
          <div className="-mt-6 pb-4">
            <NoDataEmptyState />
          </div>
        )}
      </>
    ),
    attachement_tab: (
      <>
        {images?.attachments && images?.attachments?.length > 0 ? (
          <div className="grid grid-cols-2 gap-[14px] max-h-[500px] overflow-y-scroll">
            {images?.attachments?.map((item, index) => (
              <div className="flex items-center gap-x-3">
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
          <div className="-mt-6 pb-4">
            <NoDataEmptyState />
          </div>
        )}
      </>
    ),
    link_tab: (
      <>
        {images?.links && images?.links?.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-[14px] max-h-[500px] overflow-y-scroll">
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
          <div className="-mt-6 pb-4">
            <NoDataEmptyState />
          </div>
        )}
      </>
    ),
  };

  const handleShare = () => {
    window.open(
      `https://api.whatsapp.com/send?text=https://staging.buero-365.cloudmeshsolutions.com/document-viewer?offerID=${offerId}`,
      "_blank"
    );
  };

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] xl:max-w-[624px] min-h-fit"
      >
        <div className="relative flex flex-col px-[26px] pt-5 pb-[36px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <p className="text-2xl font-medium border-b-2 border-b-[#000] border-opacity-10 pb-5">
            {translate("offers.share_images_modal.heading")}
          </p>

          <div className="mt-[17px] flex items-center gap-x-6 border-b-2 border-[#E5E5E5] ">
            {attachementTabs.map((item, index) => (
              <button
                key={index}
                className={`${
                  activeTab === item ? "text-primary" : "text-[#393939] "
                } text-base font-medium pb-[10px] ${
                  activeTab === item ? "border-b-2 border-primary" : ""
                }`}
                onClick={() => handleTabChange(item)}
              >
                {translate(`common.images_modal.${item}`)}
              </button>
            ))}
          </div>

          <div className="my-5">
            {attachementLookUp[activeTab as keyof typeof attachementLookUp]}
          </div>

          <p className="text-lg font-medium mb-3">
            {translate("common.share_on_whatsapp")}
          </p>
          <CopyField
            value={`https://api.whatsapp.com/send?text=https://staging.buero-365.cloudmeshsolutions.com/document-viewer?offerID=${offerId}`}
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
    </>
  );
};
