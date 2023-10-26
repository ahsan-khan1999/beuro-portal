import { Layout } from "@/layout";
import React, { useState } from "react";
import SettingTopDataButtons from "../SettingTopDataButtons";
import SystemSettingDetails from "./system-setting/SystemSettingDetails";
import SettingDetailsForm from "./SettingDetailsForm";

const SettingDetails = () => {
  const [switchDetails, setSwitchDetails] = useState(0);
  return (
    <Layout>
      <h1 className="text-[#222B45] font-normal text-xl">Setting</h1>
      <div className="mt-[22px]">
        <SettingTopDataButtons
          switchDetails={switchDetails}
          setSwitchDetails={setSwitchDetails}
        />
      </div>

      <div className="mt-4">
        {switchDetails === 0 ? <SettingDetailsForm /> : null}
      </div>
      <div className="mt-4">
        {switchDetails === 1 ? <SystemSettingDetails /> : null}
      </div>
    </Layout>
  );
};

export default SettingDetails;
