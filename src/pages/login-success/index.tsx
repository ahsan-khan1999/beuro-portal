import EmailConfirmation from "@/base-components/ui/email-confirmation";
import { useAppSelector } from "@/hooks/useRedux";
import { Locale } from "@/types";
import { getUser } from "@/utils/auth.util";
import { isJSON } from "@/utils/functions";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
export default function EmailVarficiation() {
  const user = isJSON(getUser());
  const { t: translate } = useTranslation();

  const data = {
    heading: " Verify Email address",
    description: `An email has been send to ${user?.email} Click the link in email to verify your email address`,
  };
  return <EmailConfirmation data={data} />;
}

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
