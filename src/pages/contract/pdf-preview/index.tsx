import PdfPriview from "@/components/contract/pdf-preview";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import { Layout } from "@/layout";


const index = () => {
  return  <Layout><PdfPriview /></Layout>;
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});