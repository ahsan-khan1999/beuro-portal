import { BaseModal } from "../base-modal";
import SuccessPopupBodyMini from "../successPopupBodyMini";

export const AddNewCard4 = ({ onClose }: { onClose: () => void }) => {
  return (
    <BaseModal
      onClose={onClose}
      containerClassName={"max-w-[476px] min-h-fit px-[50px] py-[50px]"}
    >
      <SuccessPopupBodyMini
        heading="Neue Karte erfolgreich hinzufügen"
        description=" Lorem Ipsum has been the industry's standard dummy.Lorem Ipsum has been the industry's standard dummy."
        button1="Pay Now"
        button2=""
      />
    </BaseModal>
  );
};
