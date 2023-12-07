import CustomerDetails from "@/components/customer/details";
import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";


const Index = () => {
  return <CustomerDetails />;
};

export default Index;

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});


