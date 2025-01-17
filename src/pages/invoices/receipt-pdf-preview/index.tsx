import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import DetailsPdfPriview from "@/components/invoice/details/invoice/pdf";
import { Layout } from "@/layout";
import ReceiptPdfPreview from "@/components/invoice/details/receipt/pdf";

const index = () => {
  return (
    <Layout>
      <ReceiptPdfPreview />
    </Layout>
  );
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
