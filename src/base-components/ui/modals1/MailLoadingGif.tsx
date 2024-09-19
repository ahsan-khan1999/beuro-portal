import { BaseModal } from "@/base-components/ui/modals/base-modal";
import Image from "next/image";
import React from "react";

export const MailSendLoadingGif = ({ onClose }: { onClose: () => void }) => {
  return (
    <BaseModal
      onClose={onClose}
      containerClassName="max-w-[375px] max-h-[375px] bg-transparent flex justify-center items-center"
    >
      <Image
        src="/gif/mail_send_loading.gif"
        alt="gid file"
        width={375}
        height={375}
      />
    </BaseModal>
  );
};
