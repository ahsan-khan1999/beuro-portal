import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import sendEmailIcon from "@/assets/svgs/send_email_icon.svg";
import { Button } from "../button/button";
import { useTranslation } from "next-i18next";
import { LinkSendToEmailModal } from "@/types/employee";

const LinkSendToEmail = ({
  onClose,
  createNewPswHandler,
}: LinkSendToEmailModal) => {
  const { t: translate } = useTranslation();
  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[624px] min-h-auto max-h-[465px]"
    >
      <div className="flex items-center flex-col">
        <Image
          src={sendEmailIcon}
          alt="request_submitted"
          className="mb-[37px] mt-[43px]"
        />
        <p className="font-medium text-2xl text-center mb-[13px]">
          {translate("employees.link_send_modal.main_heading")}
        </p>
        <p className="text-[#1E1E1E] text-sm font-normal flex items-center justify-center text-center px-6">
          {translate("employees.link_send_modal.sub_heading")}
        </p>

        <Button
          id="button"
          inputType="button"
          onClick={createNewPswHandler}
          text={translate("employees.link_send_modal.button")}
          className="bg-[#4A13E7] cursor-pointer mt-[31px] mb-[59px] w-[384px] rounded-lg p-4 text-white text-base font-medium"
        />
      </div>
    </BaseModal>
  );
};

export default LinkSendToEmail;
