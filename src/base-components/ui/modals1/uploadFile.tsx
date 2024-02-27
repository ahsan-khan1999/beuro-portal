import React from "react";
import Image from "next/image";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import { useRouter } from "next/router";
import { SingleFielAttachmentField } from "./single-file-attachment-field";
import { useFileUpload } from "@/hooks/modals/useFileUpload";

export const UploadFile = ({
  onClose,
}: {
  onClose: () => void;
  heading: string;
}) => {
  const {
    error,
    handleAttachementAdd,
    handleAttachementDelete,
    loading,
    loadingGlobal,
    onSubmit,
    translate,
    enteredLinks,
  } = useFileUpload();

  const router = useRouter();

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] xl:max-w-[624px] min-h-[550px]"
      >
        <div className="relative flex flex-col px-4 sm:px-[26px] pt-5 pb-[36px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <p className="text-base md:text-2xl font-medium border-b-2 border-b-[#000] border-opacity-10 pb-5">
            {translate("common.upload_file")}
          </p>

          <div className="my-0 w-full h-[415px] overflow-y-auto overflow-x-hidden">
            <div className="flex flex-col gap-y-2 my-5">
              <h2 className="text-base font-medium text-[#393939]">
                {translate("common.images_modal.single_attachment")}
              </h2>
            </div>
            <SingleFielAttachmentField
              id="attachement"
              attachements={enteredLinks?.attachements}
              fileSupported="Pdf, ODT, DOC, XLXS "
              isAttachement={true}
              isOpenedFile={false}
              text={translate("common.images_modal.add_attachment")}
              setAttachements={handleAttachementAdd}
            />
          </div>
        </div>
      </BaseModal>
    </>
  );
};
