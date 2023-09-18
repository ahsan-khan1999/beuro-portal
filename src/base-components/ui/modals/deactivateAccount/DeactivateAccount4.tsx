import React from "react";
import { BaseModal } from "../base-modal";
import SuccessPopupBodyMini from "../successPopupBodyMini";

const DeactivateAccount4 = ({ onClose }: { onClose: () => void }) => {
  return (
    <BaseModal
      onClose={onClose}
      containerClassName={"max-w-[476px] min-h-fit p-[50px]"}
    >
      <SuccessPopupBodyMini
        heading="Your account has been deactivated successfully"
        description=" Lorem Ipsum has been the industry's standard dummy.Lorem Ipsum has been the industry's standard dummy."
        button1=""
        button2="Home Page"
      />
    </BaseModal>
  );
};

export default DeactivateAccount4;
