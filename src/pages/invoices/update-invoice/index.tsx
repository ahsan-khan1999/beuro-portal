import React from "react";
import { Locale } from "@/types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import EditInvoiceDetails from "@/components/invoice/edit";

const index = () => {
  return (
    <>
      <EditInvoiceDetails />
    </>
  );
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
