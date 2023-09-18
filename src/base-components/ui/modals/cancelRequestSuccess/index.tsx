import React from "react";
import { InfoModal } from "../info-modal";
import SuccessPopupBody from "../successPopupBody";
const CancelRequestSuccess = ({ onClose }: { onClose: () => void }) => {
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Ad created successfully"
      containerClassName="max-w-[572px]"
    >
      <SuccessPopupBody
        heading="Cancellation Request Submitted Successfully"
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        button1="My Selling"
        button2="Close"
      />
    </InfoModal>
  );
};

export default CancelRequestSuccess;
