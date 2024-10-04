import React from "react";
import { Locale } from "@/types";
import { withLayout } from "@/hoc/withLayout";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { AppointmentsDetails } from "@/components/appointments/details";

const Home = () => <AppointmentsDetails />;

export default withLayout(Home);

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
