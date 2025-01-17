import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { useUploadImageOffer } from "@/hooks/modals/useUploadImageOffer";
import { LinkUpload } from "../link-upload";
import { BaseButton } from "../button/base-button";
import { ImageField } from "./image-field";
import { VideoField } from "./video-field";
import { AttachementField } from "./attachement-field";
import { useAppSelector } from "@/hooks/useRedux";
import { CompanyLogoLoader } from "../loader/company-logo-loader";
import { hasData } from "@/utils/utility";

export interface ImageUploadProps {
  handleImageSlider: Function;
  onClose: () => void;
  type: string;
  onUpdateDetails?: (id: string) => void;
  tab?: string;
}

const ImagesUploadOffer = ({
  onClose,
  handleImageSlider,
  type,
  onUpdateDetails,
  tab,
}: ImageUploadProps) => {
  const { id, refID, name, heading } = useAppSelector(
    (state) => state.global.modal.data
  );

  const { loading } = useAppSelector((state) => state.image);

  const {
    onSubmit,
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
    handleVideoAdd,
    handleimageAdd,
    loadingGlobal,
  } = useUploadImageOffer(handleImageSlider, type, id, onUpdateDetails, tab);

  const attachementLookUp = {
    img_tab: (
      <div className="my-1 h-[415px] overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-y-2 my-5">
          <h2 className="text-base font-medium text-[#393939]">
            {translate("common.images_modal.title")}
          </h2>
          <p className="text-xs font-normal text-[#8F8F8F]">
            {translate("common.images_modal.sub_title")}
          </p>
        </div>

        <ImageField
          id="attachement"
          attachements={enteredLinks?.images}
          fileSupported="PNG, JPEG, JPG, WEBP, HEIC, HEIF"
          isAttachement={true}
          isOpenedFile={false}
          text={translate("common.images_modal.add_image")}
          setAttachements={handleimageAdd}
        />
      </div>
    ),

    video_tab: (
      <div className="my-1 w-full h-[415px] overflow-y-auto overflow-x-hidden">
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
          fileSupported="MP4, MOV, AVI, WEBM, MKV, M4V, HEVC"
          isAttachement={true}
          isOpenedFile={false}
          text={translate("common.images_modal.add_video")}
          setAttachements={handleVideoAdd}
        />
      </div>
    ),
    link_tab: (
      <div className="my-1 w-full h-[415px] overflow-y-auto overflow-x-hidden">
        <div className="flex flex-col gap-y-2 my-5">
          <h2 className="text-base font-medium text-[#393939]">
            {translate("common.images_modal.link_title")}
          </h2>
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
      <div className="my-1 w-full h-[415px] overflow-y-auto overflow-x-hidden">
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
          fileSupported="PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, RTF, TXT, CSV"
          isAttachement={true}
          isOpenedFile={false}
          text={translate("common.images_modal.add_attachment")}
          setAttachements={handleAttachementAdd}
        />
      </div>
    ),
  };

  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[624px] min-h-auto max-h-fit"
    >
      <div className="relative flex flex-col px-[26px] pt-5 pb-[36px]">
        <Image
          src={crossIcon}
          alt="cross_icon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={onClose}
        />
        <p className="text-2xl font-medium">
          {translate("common.images_modal.heading")}
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
            const hasTabData = hasData(item, enteredLinks);

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

        {loading && (
          <div className="min-h-[415px] flex items-center justify-center">
            <CompanyLogoLoader />
          </div>
        )}
        {!loading && (
          <div>
            {attachementLookUp[activeTab as keyof typeof attachementLookUp]}
          </div>
        )}

        <div className="flex justify-end mt-5 min-h-[50px]">
          {!loading && (
            <BaseButton
              buttonText={translate("pdf.submit")}
              containerClassName="rounded-lg px-4 min-w-[202px] flex justify-center align-middle items-center h-[50px] bg-primary hover:bg-buttonHover"
              textClassName="text-white"
              onClick={onSubmit}
              // loading={loading || loadingGlobal}
              disabled={loadingGlobal}
            />
          )}
        </div>
      </div>
    </BaseModal>
  );
};

export default ImagesUploadOffer;
