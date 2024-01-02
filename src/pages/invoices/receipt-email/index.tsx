import ContractMail from "@/components/contract/compose-mail";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import ReceiptEmail from "@/components/invoice/compose-email-receipt";


const index = () => {
  return <ReceiptEmail />;
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
