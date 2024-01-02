import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import Login from "@/components/loginAndRegister/login/Login";
import { LoginFlowCard } from "@/layout/LoginFlowCard";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import { useRouter } from "next/router";
const Index = () => {
  return (
    <LoginFlowCard>
      <Login />
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
