import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import ResetPassword from "@/components/loginAndRegister/login/ResetPassword";
import { LoginFlowCard } from "@/layout/LoginFlowCard";
import { Locale } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const Index = () => {
  return (
    <LoginFlowCard>
      <ResetPassword />
      <DescriptionSection />
    </LoginFlowCard>
  );
};

export default Index;

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
