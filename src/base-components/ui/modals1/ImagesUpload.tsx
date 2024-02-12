import React, { useState } from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { Form } from "@/base-components/form/form";
import { useUploadImage } from "@/hooks/modals/useUploadImage";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import { BaseButton } from "../button/base-button";

const ImagesUpload = ({
  onClose,
  handleImageSlider,
}: {
  handleImageSlider: Function;
  onClose: () => void;
}) => {
  const { fields, control, onSubmit, handleSubmit, errors, error, translate } =
    useUploadImage(handleImageSlider);

  const [activeTab, setActiveTab] = useState("img_tab");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
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
            <div className="mt-[38px]">
              <p className="text-[#393939] text-base font-medium mb-[19px]">
                {translate("common.upload_link")}
              </p>
              <div className="flex items-center gap-x-4 mb-[27px]">
                <input
                  type="text"
                  placeholder="e.g https://buero-365.com/"
                  className="p-4 border border-[#4B4B4B] rounded-lg w-full h-12 outline-none text-dark text-sm focus:border-primary"
                />
                <BaseButton
                  buttonText={translate("common.add")}
                  containerClassName="rounded-lg px-4 min-w-[106px] w-fit h-[48px] bg-primary hover:bg-buttonHover"
                  textClassName="text-white"
                  onClick={() => {}}
                />
              </div>
              <div className="flex justify-between items-center border-b border-b-[#000] border-opacity-10 pb-2">
                <p className="text-base font-normal text-black truncate">
                  https://software.buero-365.com/login?_gl=1*h4zpyu....
                </p>
                <span className="border-[#4A13E7] border w-10 h-10 rounded-lg flex items-center justify-center ">
                  <Image
                    src={deleteIcon}
                    alt="deleteIcon"
                    className="cursor-pointer"
                    width={16}
                    height={20}
                  />
                </span>
              </div>

              <div className="mt-4 flex items-center gap-x-4">
                <BaseButton
                  buttonText={translate("common.cancel_button")}
                  containerClassName="rounded-lg border border-[#C7C7C7] bg-white p-4 min-w-[202px] w-fit h-[50px] text-dark hover:bg-none"
                  onClick={() => {}}
                />
                <BaseButton
                  buttonText={translate("pdf.submit")}
                  containerClassName="rounded-lg px-4 min-w-[202px] w-fit h-[50px] bg-primary hover:bg-buttonHover"
                  textClassName="text-white"
                  onClick={() => {}}
                />
              </div>
            </div>
          )}
        </div>
      </BaseModal>
    </>
  );
};

export default ImagesUpload;
