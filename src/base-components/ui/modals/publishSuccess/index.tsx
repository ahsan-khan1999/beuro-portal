import React from "react";
import { InfoModal } from "../info-modal";
import SuccessPopupBody from "../successPopupBody";
const PublishSuccess = ({ onClose }: { onClose: () => void }) => {
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Ad created successfully"
      containerClassName="max-w-[572px]"
    >
      <SuccessPopupBody
        heading="Your ad has been create successfully"
        description="Senden Sie Ihre Zahlungen so schnell wie möglich an den Verkäufer, um Ihren Artikel zu erhalten."
        button1="My Selling"
        button2="Close"
      />
    </InfoModal>
  );
};

export default PublishSuccess;
