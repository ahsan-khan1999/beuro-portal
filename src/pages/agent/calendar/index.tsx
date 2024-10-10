import React from "react";
import { Locale } from "@/types";
import { withLayout } from "@/hoc/withLayout";
import { Calendar } from "@/components/calendar";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Home = () => <Calendar />;

export default withLayout(Home);

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
