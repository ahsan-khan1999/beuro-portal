import React from "react";
import { Locale } from "@/types";
import { Layout } from "@/layout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { MainInvoicePdfDetail } from "@/components/invoice/pdf-preview";

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
