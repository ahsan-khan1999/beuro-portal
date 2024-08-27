import React, { useEffect, useState } from "react";
import { Layout } from "@/layout";
import SettingTopDataButtons from "./SettingTopDataButtons";
import MailSetting from "./mail-setting";
import SettingProfile from "./profile-form";
import PaymentSettings from "./payment-settings";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const AdminSettings = () => {
  const { query } = useRouter();
  const tab = query.tab;
  const { t: translate } = useTranslation();
  const [switchDetails, setSwitchDetails] = useState<number>(0);

  useEffect(() => {
    if (tab && !Array?.isArray(tab) && !isNaN(Number(tab))) {
      setSwitchDetails(parseInt(tab as string, 10));
    } else {
      setSwitchDetails(0);
    }
  }, [query]);

  const lookUp: { [key: number]: JSX.Element } = {
    0: <SettingProfile />,
    1: <PaymentSettings />,
    2: <MailSetting />,
  };

  return (
    <Layout>
      <h1 className="text-[#222B45] font-normal text-xl">
        {translate("admin.settings.main_heading")}
      </h1>
      <div className="mt-[22px]">
        <SettingTopDataButtons
          switchDetails={switchDetails}
          setSwitchDetails={setSwitchDetails}
        />
      </div>

      <div className="mt-4">
        {switchDetails !== undefined && lookUp[switchDetails]}
      </div>
    </Layout>
  );
};

export default AdminSettings;
