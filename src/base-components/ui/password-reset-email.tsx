import React from "react";
import Image from "next/image";
import mailPopIcon from "@/assets/svgs/email-popup-image.svg";

const PasswordResetEmail = ({ data }: { data: { heading: string, description: String } }) => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="relative shadow-emailPopup rounded-2xl bg-white pt-11 pb-[60px] px-[90px] max-w-[625px]">
        <svg
          className="absolute top-5 right-5 cursor-pointer"
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M13.498 1.23877L1.34375 13.3931M1.34375 1.23877L13.498 13.3931"
            stroke="#1E1E1E"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <Image
          src={mailPopIcon}
          alt="Email Popup Image"
          className="mb-[63px] mx-auto"
        />
        <h1 className="font-medium text-2xl text-[#000000] mb-[14px] text-center">
          {data.heading}
        </h1>
        <p className="text-sm text-dark  text-center">
          {data.description}

        </p>
      </div>
    </div>
  );
};

export default PasswordResetEmail;