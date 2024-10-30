import React, { useEffect } from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";
import pdfIcon from "@/assets/svgs/PDF_file_icon.svg";
import { useDocumentViewer } from "@/hooks/modals/userDocumentViewer";
import { useRouter } from "next/router";
import { readImage } from "@/api/slices/imageSlice/image";
import { ImagePreview } from "./image-preview";
import { CompanyLogoLoader } from "../loader/company-logo-loader";

export const DocumentViewerModal = ({ onClose }: { onClose: () => void }) => {
  const {
    activeTab,
    attachementTabs,
    handleTabChange,
    isOpenedFile,
    translate,
  } = useDocumentViewer();

  const { images, loading } = useAppSelector((state) => state.image);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { offerID, contractID, leadID } = router.query;

  const contract_ID = useAppSelector(
    (state) => state.global?.modal?.data?.contractID
  );

  useEffect(() => {
    if (offerID) {
      dispatch(readImage({ params: { type: "offerID", id: offerID } }));
    } else if (contractID || contract_ID) {
      dispatch(
        readImage({
          params: { type: "contractID", id: contractID || contract_ID },
        })
      );
    } else if (leadID) {
      dispatch(readImage({ params: { type: "leadID", id: leadID } }));
    }
  }, [offerID, contractID, contract_ID, leadID]);

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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] max-h-[350px] overflow-y-scroll">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] max-h-[350px] overflow-y-scroll">
            {images?.attachments?.map((item, index) => (
              <div
                className={`w-[99%] relative flex flex-col gap-3 h-fit border border-[#EBEBEB] rounded-md px-3 py-2 break-all ${
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
          <div className="grid grid-cols-1 gap-y-[14px] max-h-[350px] overflow-y-scroll">
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

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[480px] xl:max-w-[624px] min-h-[480px]"
    >
      <div className="relative flex flex-col px-4 sm:px-[26px] py-5 ">
        <Image
          src={crossIcon}
          alt="cross_icon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />

        <p className="text-base md:text-2xl font-medium border-b-2 border-b-[#000] border-opacity-10 pb-5">
          {translate("common.view_docs")}
        </p>

        <div className="mt-[17px] mb-5 flex items-center gap-x-6 border-b-2 border-[#E5E5E5]">
          {attachementTabs?.map((item, index) => (
            <button
              key={index}
              className={`${
                activeTab === item ? "text-primary" : "text-[#393939]"
              } text-base font-medium pb-[10px] ${
                activeTab === item ? "border-b-2 border-primary" : ""
              }`}
              onClick={() => handleTabChange(item)}
            >
              {translate(`common.images_modal.${item}`)}
            </button>
          ))}
        </div>

        {loading && (
          <div className="min-h-[300px] flex items-center justify-center">
            <CompanyLogoLoader />
          </div>
        )}
        {!loading && (
          <div className="w-full">
            {attachementLookUp[activeTab as keyof typeof attachementLookUp]}
          </div>
        )}
      </div>
    </BaseModal>
  );
};
