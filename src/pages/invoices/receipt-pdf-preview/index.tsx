import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import DetailsPdfPriview from "@/components/invoice/details/invoice/pdf";


const index = () => {
  return (
    <div>
      <DetailsPdfPriview />
    </div>
  );
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});  