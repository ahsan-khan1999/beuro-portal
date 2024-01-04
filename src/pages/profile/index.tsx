import DetailScreens from "@/components/loginAndRegister/detailScreens";
import { Locale } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const Index = () => {
  return <DetailScreens />;
};

export default Index;

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});