import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { useUploadImage } from "@/hooks/modals/useUploadImage";
import { Form } from "@/base-components/form/form";
import { LinkUpload } from "../link-upload";
import { BaseButton } from "../button/base-button";
import { AttachementField } from "./attachement-field";
import { VideoField } from "./video-field";
import { ImageField } from "./image-field";

const ImagesUpload = ({
  onClose,
  handleImageSlider,
}: {
  handleImageSlider: Function;
  onClose: () => void;
}) => {
  const {
    // fields,
    // control,
    // onSubmit,
    // handleSubmit,
    // errors,
    error,
    translate,
    activeTab,
    handleTabChange,
    enteredLink,
    enteredLinks,
    handleLinkAdd,
    handleLinkDelete,
    setEnteredLink,
    attachementTabs,
    handleAttachementAdd,
    handleAttachementDelete,
    handleVideoAdd,
    handleVideoDelete,
    handleimageAdd,
    handleImageDelete,
    onSubmit,
    loading,
    loadingGlobal,
  } = useUploadImage(handleImageSlider);
  const attachementLookUp = {
    img_tab: (
      <>
        <div className="flex flex-col gap-y-2 my-5">
          <h2 className="text-base font-medium text-[#393939]">
            {translate("common.images_modal.title")}
          </h2>
          <p className="text-xs font-normal text-[#8F8F8F]">
            {translate("common.images_modal.sub_title")}
          </p>
        </div>
        {/* <Form
        formFields={fields}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        errors={errors}
      /> */}
        <ImageField
          id="attachement"
          attachements={enteredLinks?.images}
          fileSupported="PNG, JPEG, JPG, WEBP "
          isAttachement={true}
          isOpenedFile={false}
          text={translate("common.images_modal.add_image")}
          setAttachements={handleimageAdd}
        />
      </>
    ),

    video_tab: (
      <div className="my-0 w-full">
        <div className="flex flex-col gap-y-2 my-5">
          <h2 className="text-base font-medium text-[#393939]">
            {translate("common.images_modal.video_title")}
          </h2>
          <p className="text-xs font-normal text-[#8F8F8F]">
            {translate("common.images_modal.video_sub_title")}
          </p>
        </div>
        <VideoField
          id="attachement"
          attachements={enteredLinks?.video}
          fileSupported="MP4, MOV, AVI, WEBM "
          isAttachement={true}
          isOpenedFile={false}
          text={translate("common.images_modal.add_video")}
          setAttachements={handleVideoAdd}
        />
      </div>
    ),
    link_tab: (
      <div className="my-0 w-full">
        <div className="flex flex-col gap-y-2 my-5">
          <h2 className="text-base font-medium text-[#393939]">
            {translate("common.images_modal.link_title")}
          </h2>
          {/* <p className="text-xs font-normal text-[#8F8F8F]">
            {translate("common.images_modal.link_sub_title")}
          </p> */}
        </div>
        <LinkUpload
          inputLink={enteredLink}
          onAddLink={handleLinkAdd}
          enteredLinks={enteredLinks["links"]}
          onLinkDelete={handleLinkDelete}
          setEnteredLink={setEnteredLink}
        />
      </div>
    ),
    attachement_tab: (
      <div className="my-0 w-full">
        <div className="flex flex-col gap-y-2 my-5">
          <h2 className="text-base font-medium text-[#393939]">
            {translate("common.images_modal.attachement_title")}
          </h2>
          <p className="text-xs font-normal text-[#8F8F8F]">
            {translate("common.images_modal.attachement_sub_title")}
          </p>
        </div>
        <AttachementField
          id="attachement"
          attachements={enteredLinks?.attachements}
          fileSupported="Pdf, ODT, DOC, XLXS "
          isAttachement={true}
          isOpenedFile={false}
          text={translate("common.images_modal.add_attachment")}
          setAttachements={handleAttachementAdd}
        />
      </div>
    ),
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

          <p className="text-2xl font-medium text-[#000] border-b-2 border-b-[#000] border-opacity-10 pb-5">
            {translate("common.images_modal.heading")}
          </p>

          <div className="mt-[17px] flex items-center gap-x-6 border-b-2 border-[#E5E5E5] ">
            {attachementTabs.map((item, index) => (
              <button
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

          {attachementLookUp[activeTab as keyof typeof attachementLookUp]}

          <div className="flex justify-end mt-5">
            <BaseButton
              buttonText={translate("pdf.submit")}
              containerClassName="rounded-lg px-4 min-w-[202px] flex justify-center align-middle items-center h-[50px] bg-primary hover:bg-buttonHover"
              textClassName="text-white"
              onClick={onSubmit}
              loading={loading || loadingGlobal}
              disabled={loadingGlobal}
            />
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default ImagesUpload;
