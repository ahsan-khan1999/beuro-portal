import React from "react";
import TickIcon from "@/assets/svgs/success-tick-popup.svg";
import Image from "next/image";
import { successPopup } from "@/types";
const SuccessPopupBody = ({
  heading,
  description,
  button1,
  button2,
}: successPopup) => {
  return (
    <>
      <Image className="mt-[66px] mx-auto " src={TickIcon} alt="Success Icon" />

      <h2 className="mt-[46px] text-2xl font-semibold text-[#272727] text-center">
        {heading}
      </h2>
      <p className="mt-[22px] text-sm text-[#616161] text-center">
        {description}
      </p>
      <button className="mt-11 font-medium text-white bg-secondary rounded-lg py-[14px] min-w-full">
        {button1}
      </button>
      <button className="mt-4 font-medium   rounded-lg py-[14px] border border-[#C4C4C4] min-w-full text-[#616161]">
        {button2}
      </button>
    </>
  );
};

export default SuccessPopupBody;
