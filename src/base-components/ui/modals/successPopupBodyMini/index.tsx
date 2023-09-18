import React from "react";
import TickIcon from "@/assets/svgs/success-tick-popup.svg";
import Image from "next/image";
import { successPopup } from "@/types";
const SuccessPopupBodyMini = ({
  heading,
  description,
  button1,
  button2,
}: successPopup) => {
  return (
    <>
      <Image
        className=" mx-auto "
        width={100}
        height={100}
        src={TickIcon}
        alt="Success Icon"
      />

      <h2 className="mt-10 text-2xl md:leading-[35px] font-semibold text-[#272727] text-center">
        {heading}
      </h2>
      <p className="mt-3 text-sm text-[#616161] text-center">{description}</p>
      {button1 && (
        <button className="mt-5 font-medium text-white bg-secondary rounded-lg py-3 min-w-full">
          {button1}
        </button>
      )}
      {button2 && (
        <button className="mt-5 font-medium   rounded-lg py-3 border border-[#C4C4C4] min-w-full text-[#616161]">
          {button2}
        </button>
      )}
    </>
  );
};

export default SuccessPopupBodyMini;
