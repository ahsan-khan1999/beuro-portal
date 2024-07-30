import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import { withLayout } from "@/hoc/withLayout";
import { CreateReport } from "@/components/agent/appointments/createReport";

const Home = () => <CreateReport />;

export default withLayout(Home);

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
