import PdfPreview from "@/components/content/pdfPriview";
import { Layout } from "@/layout";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";


const index = () => {
  return (
    <Layout>
      <PdfPreview />
    </Layout>
  );
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});