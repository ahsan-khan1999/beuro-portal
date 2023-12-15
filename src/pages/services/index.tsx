import React from "react";
import Services from "@/components/services";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";

export default function Index() {
  return <Services />;
}

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
