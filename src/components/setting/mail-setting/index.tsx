import React, { useState, useEffect } from "react";
import SettingLayout from "../SettingLayout";
import { ConfigrationTabs } from "./configration-tabs";
import { EmailTemplateForm } from "./email-template-form";
import { MailSettingsComponentsType } from "@/enums/setting";
import { readEmailSettings } from "@/api/slices/settingSlice/settings";
import { useAppDispatch } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";

export const MailSetting = ({
  handleCreation,
}: {
  handleCreation: Function;
}) => {
  const dispatch = useAppDispatch();
  const { t: translate } = useTranslation();
  const [changedComponent, setChangedComponent] =
    useState<MailSettingsComponentsType>(
      MailSettingsComponentsType.CONFIGURATION
    );

  const handleChangedComponent = (component: MailSettingsComponentsType) => {
    setChangedComponent(component);
  };

  useEffect(() => {
    dispatch(readEmailSettings({}));
  }, []);

  return (
    <div>
      <SettingLayout containerClassName="pl-[31px] my-[14px] space-x-8">
        <button
          className={`text-base font-medium ${
            changedComponent === MailSettingsComponentsType.CONFIGURATION
              ? "text-[#4A13E7]"
              : "text-[#4B4B4B]"
          }`}
          onClick={() =>
            handleChangedComponent(MailSettingsComponentsType.CONFIGURATION)
          }
        >
          {translate("setting.mail_setting.email_config")}
        </button>
        <button
          className={`text-base font-medium ${
            changedComponent === MailSettingsComponentsType.EMAIL_TEMPLATE
              ? "text-[#4A13E7]"
              : "text-[#4B4B4B]"
          }`}
          onClick={() =>
            handleChangedComponent(MailSettingsComponentsType.EMAIL_TEMPLATE)
          }
        >
          {translate("setting.mail_setting.email_templates")}
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
