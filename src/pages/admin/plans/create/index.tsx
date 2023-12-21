import React from "react";

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Locale } from "@/types";
import CreatePlan from "@/components/admin/plans/add";

const Index = () => {
  return <CreatePlan />;
};

export default Index;

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
