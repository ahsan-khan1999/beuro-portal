import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import { AgentLeadsDetails } from "@/components/agent/leads/details";

export default function () {
  return <AgentLeadsDetails />;
}

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
