import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { SingleFielAttachmentField } from "./single-file-attachment-field";
import { useFileUpload } from "@/hooks/modals/useFileUpload";
import { BaseButton } from "../button/base-button";

export const UploadFile = ({
  onClose,
}: {
  onClose: () => void;
  heading: string;
}) => {
  const {
    handleAttachementAdd,
    loading,
    loadingGlobal,
    onSubmit,
    translate,
    enteredLinks,
  } = useFileUpload();

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] xl:max-w-[624px] max-h-[450px] min-h-[450px]"
      >
        <div className="relative flex flex-col px-4 sm:px-[26px] py-5">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <p className="text-base md:text-2xl font-medium border-b-2 border-b-[#000] border-opacity-10 pb-5">
            {translate("common.upload_file")}
          </p>

          <h2 className="text-base font-medium text-[#393939] mt-4 mb-2">
            {translate("common.images_modal.single_attachment")}
          </h2>

          <SingleFielAttachmentField
            id="attachement"
            attachements={enteredLinks?.attachements}
            fileSupported="Pdf, ODT, DOC, XLXS"
            isAttachement={true}
            isOpenedFile={false}
            text={translate("common.images_modal.add_attachment")}
            setAttachements={handleAttachementAdd}
          />

          <div className="flex justify-end mt-5">
            <BaseButton
              buttonText={translate("common.upload_file")}
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
