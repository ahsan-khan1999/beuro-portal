import React, { useState } from "react";
import { Layout } from "@/layout";
import SettingTopDataButtons from "./SettingTopDataButtons";
import MailSetting from "./mail-setting";
import SettingProfile from "./profile-form";
import PaymentSettings from "./payment-settings";
import { useTranslation } from "next-i18next";

const AdminSettings = () => {
  const [switchDetails, setSwitchDetails] = useState(0);

  const { t: translate } = useTranslation();

  return (
    <>
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
          {switchDetails === 0 ? <SettingProfile /> : null}
        </div>
        <div className="mt-4">
          {switchDetails === 1 ? <PaymentSettings /> : null}
        </div>
        <div className="mt-4">
          {switchDetails === 2 ? <MailSetting /> : null}
        </div>
      </Layout>
    </>
  );
};

export default AdminSettings;
