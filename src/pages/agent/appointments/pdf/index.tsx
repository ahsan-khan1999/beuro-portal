import React from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import { Layout } from "@/layout";
import { ReportPdfPreview } from "@/components/agent/appointments/pdf";

const index = () => {
  return (
    <Layout>
      <ReportPdfPreview />
    </Layout>
  );
};

export default index;

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
