import { Layout } from "@/layout";
import { Locale } from "@/types";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ContentPdfPriview } from "@/components/content/pdf";

const index = () => {
  return (
    <Layout>
      <ContentPdfPriview />
    </Layout>
  );
};

export default index;

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
