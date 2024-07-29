import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import { withLayout } from "@/hoc/withLayout";
import AgentLeads from "@/components/agent/leads";

const Home = () => <AgentLeads />;

export default withLayout(Home);

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
