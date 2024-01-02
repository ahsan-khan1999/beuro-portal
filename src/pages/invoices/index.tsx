import Invoices from "@/components/invoice";
import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import { withLayout } from "@/hoc/withLayout";

const Home = () => <Invoices />;

export default withLayout(Home);
export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
