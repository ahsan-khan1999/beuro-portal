import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";
import createdIcon from "@/assets/svgs/created_icon.svg";
import { UpdateSuccessProps } from "@/types/global";
import { Button } from "../button/button";
import { useTranslation } from "next-i18next";

const RecordUpdateSuccess = ({
  onClose,
  modelHeading,
  modelSubHeading,
  cancelHandler,
  confirmHandler,
  loading,
}: UpdateSuccessProps) => {
  const { t: translate } = useTranslation();
  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[360px] md:max-w-[480px] lg:max-w-[624.862px] min-h-fit"
    >
      <div className="relative flex flex-col items-center">
        <Image
          src={createdIcon}
          alt="delete_icon"
          className="mt-[47px] w-[70px] h-[70px] md:w-fit md:h-fit"
        />
        <p className="font-medium text-base md:text-2xl md:mt-[40px] text-center">
          {modelHeading}
        </p>

        <span className="text-[#1E1E1E] font-normal text-sm mt-[6px]">
          {modelSubHeading}
        </span>
        <div className="flex justify-between space-x-4 mt-[32px] mb-5 lg:mb-[68px]">
          <button
            onClick={cancelHandler}
            className="bg-[#BFBFBF] cursor-pointer w-[100px] md:w-[150px] rounded-lg px-4 text-dark text-base font-medium hover:bg-buttonHover hover:text-white"
          >
            {translate("common.cancel_button")}
          </button>
          <Button
            id="confirm"
            inputType="button"
            loading={loading}
            onClick={confirmHandler}
            text={translate("leads.confirm_lead_modal.confirm_button")}
            className="bg-[#4A13E7] cursor-pointer px-5 w-[100px] md:w-[150px] rounded-lg text-white text-base font-medium"
          />
        </div>
      </div>
    </BaseModal>
  );
};

export default RecordUpdateSuccess;
