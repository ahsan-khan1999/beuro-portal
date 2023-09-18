import React from "react";
import { InfoModal } from "../info-modal";
import SuccessPopupBody from "../successPopupBody";
const Confirmation3 = ({ onClose }: { onClose: () => void }) => {
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Decline Offer"
      containerClassName="max-w-[572px] min-h-fit"
    >
      <p className="font-medium text-xl text-[#272727] mb-[75px] mt-5">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
      <button className="mt-11 font-medium text-white bg-[#CB2C2C] rounded-lg py-[14px] min-w-full">
        Decline Offer
      </button>
      <button className="mt-4 font-medium   rounded-lg py-[14px] border border-[#C4C4C4] min-w-full text-[#616161]">
        Schließen Sie
      </button>
    </InfoModal>
  );
};

export default Confirmation3;
