import { Layout } from "@/layout";
import { Locale } from "@/types";
import React from "react";
import OfferPdfPriview from "@/components/offers/pdfPriview";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const index = () => {
  return (
    <Layout>
      <OfferPdfPriview />
    </Layout>
  );
};

export default index;

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
