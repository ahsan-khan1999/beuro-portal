import React from "react";
import { InfoModal } from "../info-modal";
import SuccessPopupBody from "../successPopupBody";
const MakeOfferSuccess7 = ({ onClose }: { onClose: () => void }) => {
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Offer Successfully added in drafts"
      containerClassName="max-w-[572px]"
    >
      <SuccessPopupBody
        heading="Your offer has been created successfully"
        description="Senden Sie Ihre Zahlungen so schnell wie möglich an den Verkäufer, um Ihren Artikel zu erhalten."
        button1="My Selling"
        button2="Close"
      />
    </InfoModal>
  );
};

export default MakeOfferSuccess7;
