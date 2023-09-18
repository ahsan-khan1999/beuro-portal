import { InfoModal } from "@/components";
import SuccessPopupBody from "../successPopupBody";
import { BaseModal } from "../base-modal";
import SuccessPopupBodyMini from "../successPopupBodyMini";

export const PaymentSuccess = ({ onClose }: { onClose: () => void }) => {
  return (
    <BaseModal
      onClose={onClose}
      containerClassName={"max-w-[476px] min-h-fit px-[50px] py-[50px]"}
    >
      <SuccessPopupBodyMini
        heading="Payment Successful"
        description="Lorem Ipsum has been the industry's standard dummy.Lorem Ipsum has been the industry's standard dummy."
        button1=""
        button2="Close"
      />
    </BaseModal>
  );
};
