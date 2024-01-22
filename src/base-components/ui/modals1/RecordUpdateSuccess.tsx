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
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] lg:max-w-[624.862px] min-h-fit"
      >
        <div className="relative flex flex-col items-center">
          <Image src={createdIcon} alt="delete_icon" className="mt-[47px]" />
          <p className="text-[#000] font-medium text-[24px] leading-7 mt-[40px]  text-center ">
            {modelHeading}
          </p>

          <span className="text-[#1E1E1E] font-normal text-[14px] mt-[6px]">
            {modelSubHeading}
          </span>
          <div className="flex justify-between space-x-4 mt-[32px] mb-5 lg:mb-[68px]">
            <button
              onClick={cancelHandler}
              className="bg-[#BFBFBF] cursor-pointer px-5 min-w-[150px] w-fit rounded-lg p-4 text-white text-base font-medium"
            >
              {translate("common.cancel_button")}
            </button>
            <Button
              id="confirm"
              inputType="button"
              loading={loading}
              onClick={confirmHandler}
              text={translate("leads.confirm_lead_modal.confirm_button")}
              className="bg-[#4A13E7] cursor-pointer px-5 min-w-[150px] w-fit rounded-lg  text-white text-base font-medium"
            />
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default RecordUpdateSuccess;
