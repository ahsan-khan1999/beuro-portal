import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import ForgetPasswordEmail from "@/components/loginAndRegister/login/ForgetPasswordEmail";
import { LoginFlowCard } from "@/layout/LoginFlowCard";
import { Locale } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const Index = () => {
  return (
    <LoginFlowCard>
      <ForgetPasswordEmail />
      <DescriptionSection />
    </LoginFlowCard>
  );
};

export default Index;
{translate("email_verification.login")}
