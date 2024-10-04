import EmailConfirmation from "@/base-components/ui/email-confirmation";
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
    heading: `${translate("common.modals.verify_email")}`,
    description: `${translate("common.modals.verify_email_des1")} ${
      user?.email
    } ${translate("common.modals.verify_email_des2")}`,
  };
  return <EmailConfirmation data={data} />;
}

export const getStaticProps = async ({ locale }: Locale) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});
