import React from "react";
import { Locale } from "@/types";
import { withLayout } from "@/hoc/withLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ReportDetails } from "@/components/agent/appointments/report-detail";

const Home = () => <ReportDetails />;

export default withLayout(Home);

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
