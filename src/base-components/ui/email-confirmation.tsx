import React, { useEffect } from "react";
import Image from "next/image";
import mailPopIcon from "@/assets/svgs/email-popup-image.svg";
import { Button } from "@/base-components/ui/button/button";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useRouter } from "next/router";
import { sendOtpViaEmail, verifyOtp } from "@/api/slices/authSlice/auth";
import { BaseButton } from "./button/base-button";
import { useTranslation } from "next-i18next";

const EmailConfirmation = ({
  data,
}: {
  data: { heading: string; description: string };
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const handleVerifyEmail = () => {
    router.push("/login");
  };
  const handleSendOtp = () => {
    dispatch(sendOtpViaEmail({}));
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="relative shadow-emailPopup rounded-2xl bg-white pt-11 pb-[60px] px-[90px] max-w-[625px]">
        <Image
          src={mailPopIcon}
          alt="Email Popup Image"
          className="mb-9 mx-auto"
        />
        <h1 className="font-medium text-2xl text-[#000000] mb-3 text-center">
          {data.heading}
        </h1>
        <p className="text-sm text-dark mb-8 text-center">{data.description}</p>
        <div className="flex justify-between space-x-3">
          <BaseButton
            buttonText={translate("email_verification.login")}
            containerClassName="w-full min-w-[216px] w-fit bg-white "
            onClick={handleVerifyEmail}
          />
          <BaseButton
            buttonText={translate("email_verification.sendagain")}
            containerClassName="w-full min-w-[216px] w-fit bg-primary  "
            textClassName="text-white"
            onClick={handleSendOtp}
          />
        </div>
      </div>
    </div>
  );
};

export default EmailConfirmation;
