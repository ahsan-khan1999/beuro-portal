import React from 'react'
import Image from "next/image";
import mailPopIcon from "@/assets/svgs/email-popup-image.svg";
import { Button } from "@/base-components/ui/button/button";

const EmailConfirmation = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="relative shadow-emailPopup rounded-2xl bg-white pt-11 pb-[60px] px-[90px] max-w-[625px]">
        <Image
          src={mailPopIcon}
          alt="Email Popup Image"
          className="mb-9 mx-auto"
        />
        <h1 className="font-medium text-2xl text-[#000000] mb-3 text-center">
          Please Confirm your email address
        </h1>
        <p className="text-sm text-dark mb-8 text-center">
          Thanks for signing up to Buro we are happy to have you. Please take a
          second to make sure we have your correct email address
        </p>
        <Button
          text="Confirm Email Address"
          inputType="button"
          className="w-full max-w-[384px] mx-auto"
        />
      </div>
    </div>
  );
}

export default EmailConfirmation