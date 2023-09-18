import React from "react";
import { InfoModal } from "../info-modal";
import SuccessPopupBody from "../successPopupBody";
const ItemPurchaseSuccess = ({ onClose }: { onClose: () => void }) => {
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Artikel kaufen"
      containerClassName="max-w-[572px]"
    >
      <SuccessPopupBody
        heading="Sie haben diesen Artikel gekauft"
        description="Senden Sie Ihre Zahlungen so schnell wie möglich an den Verkäufer, um Ihren Artikel zu erhalten."
        button1="My Buying"
        button2="Close"
      />
    </InfoModal>
  );
};

export default ItemPurchaseSuccess;
