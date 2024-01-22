import PdfPriview from "@/components/offers/pdfPriview";
import { Layout } from "@/layout";
import { Locale } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const index = () => {
  return (
    <Layout>
      <PdfPriview />
    </Layout>
  );
};

export default index;

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
