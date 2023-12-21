import DescriptionSection from "@/components/loginAndRegister/DescriptionSection";
import Login from "@/components/loginAndRegister/login/Login";
import { LoginFlowCard } from "@/layout/LoginFlowCard";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
// import Table from "@/base-components/table";

export default function Home() {
  return (
    <LoginFlowCard>
      <Login />
      <DescriptionSection />
    </LoginFlowCard>
  );
}

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
