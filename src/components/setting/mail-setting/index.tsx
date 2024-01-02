import React, { useState, useEffect } from "react";
import SettingLayout from "../SettingLayout";
import { ConfigrationTabs } from "./configration-tabs";
import { EmailTemplateForm } from "./email-template-form";
import { MailSettingsComponentsType } from "@/enums/setting";
import { readEmailSettings } from "@/api/slices/settingSlice/settings";
import { useAppDispatch } from "@/hooks/useRedux";

const MailSetting = ({ handleCreation }: { handleCreation: Function }) => {
  const dispatch = useAppDispatch()
  const [changedComponent, setChangedComponent] =
    useState<MailSettingsComponentsType>(
      MailSettingsComponentsType.CONFIGURATION
    );

  const handleChangedComponent = (component: MailSettingsComponentsType) => {
    setChangedComponent(component);
  };
  useEffect(() => {
    dispatch(readEmailSettings({}))
  }, [])

  return (
    <div>
      <SettingLayout containerClassName="pl-[31px] my-[14px] space-x-8">
        <button
          className={`text-base font-medium ${changedComponent === MailSettingsComponentsType.CONFIGURATION
            ? "text-[#4A13E7]"
            : "text-[#4B4B4B]"
            }`}
          onClick={() =>
            handleChangedComponent(MailSettingsComponentsType.CONFIGURATION)
          }
        >
          Email Configuration
        </button>
        <button
          className={`text-base font-medium ${changedComponent === MailSettingsComponentsType.EMAIL_TEMPLATE
            ? "text-[#4A13E7]"
            : "text-[#4B4B4B]"
            }`}
          onClick={() =>
            handleChangedComponent(MailSettingsComponentsType.EMAIL_TEMPLATE)
          }
        >
          Email template
        </button>
      </SettingLayout>

      {changedComponent === MailSettingsComponentsType.CONFIGURATION ? (
        <ConfigrationTabs onHandleCreation={handleCreation} />
      ) : (
        <EmailTemplateForm handleCreation={handleCreation} />
      )}
    </div>
  );
};

export default MailSetting;
