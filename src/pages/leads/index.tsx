import React from "react";
import Leads from "@/components/leads";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";

export default function Index() {
  return <Leads />;
}
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});