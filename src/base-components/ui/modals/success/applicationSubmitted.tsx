import { InfoModal } from "@/components";
import SuccessPopupBody from "../successPopupBody";
import { BaseModal } from "../base-modal";
import SuccessPopupBodyMini from "../successPopupBodyMini";

export const ApplicationSubmitted = ({ onClose }: { onClose: () => void }) => {
  return (
    <BaseModal
      onClose={onClose}
      containerClassName={"max-w-[476px] min-h-fit px-[50px] py-[50px]"}
    >
      <SuccessPopupBodyMini
        heading="Ihr Antrag wurde erfolgreich eingereicht"
        description=" Lorem Ipsum has been the industry's standard dummy.Lorem Ipsum has been the industry's standard dummy."
        button1=""
        button2="Schließen"
      />
    </BaseModal>
  );
};
