import React from "react";
import { InfoModal } from "../info-modal";
import Image from "next/image";
import cancelSellIcon from "@/assets/cancel-sell-icon.png";
const CancelSell = ({ onClose }: { onClose: () => void }) => {
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Cancel Sell"
      containerClassName="max-w-[572px] min-h-fit"
    >
      <Image
        className="mt-[60px] mx-auto "
        src={cancelSellIcon}
        alt="Cancel Sell Icon"
      />

      <p className="mt-10 font-medium  text-gray text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry
      </p>
      <button className="mt-[60px] font-medium text-white bg-[#CB2C2C] rounded-lg py-[14px] min-w-full">
        Submit Request
      </button>
      <button className="mt-3 font-medium   rounded-lg py-[14px] border border-[#C4C4C4] min-w-full text-[#616161]">
        Back
      </button>
    </InfoModal>
  );
};

export default CancelSell;
