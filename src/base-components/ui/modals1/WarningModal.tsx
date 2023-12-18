import { useState } from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import { useTranslation } from "next-i18next";
import warningIcon from "@/assets/svgs/warning_icon.svg";
import crossIcon from "@/assets/svgs/cross_icon.svg";

const WarningModal = ({
  onClose,
  handleCreated,
}: {
  onClose: () => void;
  handleCreated: () => void;
}) => {
  const { t: translate } = useTranslation();
  const [confirmCompany, setConfirmCompany] = useState(false);

  const handleYesButtonClick = () => {
    setConfirmCompany(true);
  };

  const handleCompanyCancelButton = () => {
    confirmCompany ? setConfirmCompany(false) : onClose();
  };

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] lg:max-w-[570.236px] min-h-fit "
      >
        <div className="relative flex flex-col items-center pt-[69px] pb-[67px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />

          <Image src={warningIcon} alt="delete_icon" />
          <p className="text-[#000] font-medium text-2xl mt-[64px] text-center mb-2">
            {confirmCompany
              ? translate("common.are_you_sure_modal.confirm_heading")
              : translate("common.are_you_sure_modal.title")}
          </p>

          <div className="flex flex-col justify-center items-center ">
            <span className="text-[#1E1E1E] font-normal text-[14px] text-center mt-[6px]">
              {confirmCompany
                ? translate("common.are_you_sure_modal.company_name")
                : translate("common.are_you_sure_modal.sub_heading")}
            </span>

            {confirmCompany && (
              <div className="mt-[10px] border border-[#EBEBEB] w-[260.285px] py-4 flex justify-center items-center">
                <span className="text-base font-medium text-[#4B4B4B]">
                  Umzug Fuchs
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-[36px] mt-[40px]">
            <button
              className="py-[11px] px-[25px] w-[177px] text-[#fff] bg-[#BFBFBF] rounded-md"
              onClick={handleCompanyCancelButton}
            >
              {translate("common.are_you_sure_modal.cancel_button")}
            </button>
            {!confirmCompany && (
              <button
                onClick={handleYesButtonClick}
                className="p-4 text-[#fff] w-[177px] bg-[#4A13E7] rounded-md"
              >
                {translate("common.are_you_sure_modal.yes_button")}
              </button>
            )}
            {confirmCompany && (
              <button
                onClick={handleCreated}
                className="p-4 text-[#fff] w-[177px] bg-[#4A13E7] rounded-md"
              >
                {translate("common.are_you_sure_modal.confirm_button")}
              </button>
            )}
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default WarningModal;
