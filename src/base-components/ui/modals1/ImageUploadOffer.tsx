import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useUploadImageOffer } from "@/hooks/modals/useUploadImageOffer";
import { LinkUpload } from "../link-upload";
import { BaseButton } from "../button/base-button";

const ImagesUploadOffer = ({
  onClose,
  handleImageSlider,
  type,
}: {
  handleImageSlider: Function;
  onClose: () => void;
  type: string;
}) => {
  const {
    fields,
    control,
    onSubmit,
    handleSubmit,
    errors,
    error,
    translate,
    activeTab,
    enteredLink,
    enteredLinks,
    handleLinkAdd,
    handleLinkDelete,
    handleTabChange,
    setEnteredLink,
  } = useUploadImageOffer(handleImageSlider, type);

  return (
    <>
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
          <p className="text-2xl font-medium text-[#000] border-b-2 border-b-[#000] border-opacity-10 pb-5">
            {translate("common.images_modal.heading")}
          </p>

          <div className="mt-[17px] flex items-center gap-x-6 border-b-2 border-[#E5E5E5] ">
            <button
              className={`${
                activeTab === "img_tab" ? "text-primary" : "text-[#393939]"
              } text-base font-medium pb-[10px] ${
                activeTab === "img_tab" ? "border-b-2 border-primary" : ""
              }`}
              onClick={() => handleTabChange("img_tab")}
            >
              {translate("common.images_modal.img_tab")}
            </button>
            <button
              className={`${
                activeTab === "link_tab" ? "text-primary" : "text-[#393939]"
              } text-base font-medium pb-[10px] ${
                activeTab === "link_tab" ? "border-b-2 border-primary" : ""
              }`}
              onClick={() => handleTabChange("link_tab")}
            >
              {translate("common.images_modal.link_tab")}
            </button>
          </div>
          {activeTab === "img_tab" && (
            <>
              <div className="flex flex-col gap-y-2 my-5">
                <h2 className="text-base font-medium text-[#393939]">
                  {translate("common.images_modal.title")}
                </h2>
                <p className="text-xs font-normal text-[#8F8F8F]">
                  {translate("common.images_modal.sub_title")}
                </p>
              </div>
              <Form
                formFields={fields}
                handleSubmit={handleSubmit}
                onSubmit={onSubmit}
                errors={errors}
              />
            </>
          )}

          {activeTab === "link_tab" && (
            <LinkUpload
              inputLink={enteredLink}
              onAddLink={handleLinkAdd}
              enteredLinks={enteredLinks}
              onLinkDelete={handleLinkDelete}
              setEnteredLink={setEnteredLink}
            />
          )}

          <div className="flex justify-end mt-5">
            <BaseButton
              buttonText={translate("pdf.submit")}
              containerClassName="rounded-lg px-4 min-w-[202px] w-fit h-[50px] bg-primary hover:bg-buttonHover"
              textClassName="text-white"
              onClick={() => {}}
            />
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default ImagesUploadOffer;
