import ServicesDetails from "@/components/services/details";
import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";

const index = () => {
  return (
    <div>
      <ServicesDetails />
    </div>
  );
};

export default index;
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
