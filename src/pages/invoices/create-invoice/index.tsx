import React from "react";
import { Locale } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { InvoiceCreateDetail } from "@/components/invoice/createInvoice";

const index = () => {
  return <InvoiceCreateDetail />;
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
