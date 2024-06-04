import React, { useEffect, useState } from "react";
import { Layout } from "@/layout";
import SettingTopDataButtons from "./SettingTopDataButtons";
import MailSetting from "./mail-setting";
import SettingProfile from "./profile-form";
import PaymentSettings from "./payment-settings";
import { useRouter } from "next/router";

const AdminSettings = () => {
  const { query } = useRouter();
  const tab = query.tab;
  const [switchDetails, setSwitchDetails] = useState<number>(0);

  useEffect(() => {
    if (tab && !Array.isArray(tab) && !isNaN(Number(tab))) {
      setSwitchDetails(parseInt(tab as string, 10));
    } else {
      setSwitchDetails(0);
    }
  }, [query]);

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
