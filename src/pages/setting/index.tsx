import Setting from "@/components/setting";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";

const index = () => {
  return <Setting />;
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
