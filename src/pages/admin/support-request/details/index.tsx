import SupportRequestDetails from "@/components/admin/support-request/details";
import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";

const Index = () => {
  return <SupportRequestDetails />;
};

export default Index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
