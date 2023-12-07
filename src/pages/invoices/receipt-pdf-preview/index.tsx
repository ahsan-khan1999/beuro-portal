import ReceiptPdfPriview from "@/components/invoice/details/receipt/pdf";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";


const index = () => {
  return (
    <div>
      <ReceiptPdfPriview />
    </div>
  );
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});