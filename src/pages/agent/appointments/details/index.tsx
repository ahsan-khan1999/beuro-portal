import React from "react";
import { Locale } from "@/types";
import { withLayout } from "@/hoc/withLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AgentAppointmentsDetails } from "@/components/agent/appointments/details";

const Home = () => <AgentAppointmentsDetails />;

export default withLayout(Home);

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
