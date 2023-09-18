import React from "react";
import { InfoModal } from "../info-modal";
import ReportAndCancel from "../ReportAndCancel";

const CancelSell1 = ({ onClose }: { onClose: () => void }) => {
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Cancel Sell"
      containerClassName="max-w-[572px] min-h-fit"
    >
      <ReportAndCancel
        description="Lorem Ipsum is simply dummy text of the printing and typesetting industry"
        label1="Buyer not responding"
        label2="Buyer don't want to pay"
        label3="I can't deliver the item"
        label4="Fales Information"
        label5="Misinformation about Payments"
        label6="Other"
        textAreaLabel="Describe reason of cancellation"
        placeholder="Describe your reason"
        checkBoxLabel="I agree to the terms and conditions of Kaufes cancellation policy."
        button1="Submit Request"
        button2="Back"
      />
    </InfoModal>
  );
};

export default CancelSell1;
