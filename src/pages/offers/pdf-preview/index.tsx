import { Layout } from "@/layout";
import { Locale } from "@/types";
import { MainInvoicePdfDetail } from "@/components/invoice/pdf-preview";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";

const index = () => {
  return (
    <Layout>
      <MainInvoicePdfDetail />
    </Layout>
  );
};

export default index;

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
