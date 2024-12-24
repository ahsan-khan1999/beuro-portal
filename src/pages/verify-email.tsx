import React, { useEffect, useState } from "react";
import Image from "next/image";
import mailPopIcon from "@/assets/svgs/email-popup-image.svg";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { useRouter } from "next/router";
import {
  sendOtpViaEmail,
  setErrorMessage,
  verifyOtp,
} from "@/api/slices/authSlice/auth";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { useTranslation } from "next-i18next";

const VerifyEmail = () => {
  const { t: translate } = useTranslation();

  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [isContinue, setIsContinue] = useState(false);
  const { otp } = router.query;

  useEffect(() => {
    if (otp) {
      dispatch(verifyOtp(router)).then((response: any) => {
        if (response?.payload) {
          dispatch(setErrorMessage(null));
          setIsContinue(true);
        }
      });
    }
  }, [dispatch, otp]);

  const handleSendOtp = () => {
    dispatch(sendOtpViaEmail({}));
  };

  const handleRouteChange = () => {
    // conditionHandlerProfile(router, user)
    router.push("/login");
  };

  // const data = {
  //   heading: `${translate("common.modals.verifying_email")}`,
  //   description: `${translate("common.modals.verifying_des")}`,
  // };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="relative shadow-emailPopup rounded-2xl bg-white pt-11 pb-[60px] px-[90px] max-w-[625px]">
        <Image src={mailPopIcon} alt="Email Popup " className="mb-9 mx-auto" />
        <h1 className="font-medium text-2xl text-[#000000] mb-3 text-center">
          {translate("common.modals.verifying_email")}
        </h1>
        <p className="text-sm text-dark mb-8 text-center">
          {translate("common.modals.verifying_des")}
        </p>
        <div className="flex justify-center space-x-3">
          <BaseButton
            buttonText={translate("common.resend_button")}
            onClick={handleSendOtp}
            disabled={loading || isContinue}
            containerClassName=" bg-secondary px-5"
            textClassName="text-white"
          />
          <BaseButton
            buttonText={translate("common.continue")}
            onClick={handleRouteChange}
            disabled={!isContinue}
            containerClassName=" bg-primary px-5"
            textClassName="text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
