import React, { useState } from "react";
import SettingLayout from "./SettingLayout";
import { useTranslation } from "next-i18next";

const SettingTopDataButtons = ({
  switchDetails,
  setSwitchDetails,
}: {
  switchDetails: number; // Change the type to number
  setSwitchDetails: (item: number) => void; // Change the type to number
}) => {
  const { t: translate } = useTranslation();
  const buttonsData: string[] = [
    `${translate("setting.steps_heading.account_setting")}`,
    `${translate("setting.steps_heading.system_setting")}`,
    `${translate("setting.steps_heading.templates")}`,
    `${translate("setting.steps_heading.follow_up_setting")}`,
    // `${translate("setting.steps_heading.billing")}`,
    `${translate("setting.steps_heading.mail_setting")}`,
    `${translate("setting.steps_heading.qr_settings")}`,

  ];

  // State to track the active button index (set to 0 for the first item by default)
  const [activeButton, setActiveButton] = useState(0);

  return (
    <SettingLayout containerClassName="bg-white py-3">
      <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-3 grid-cols-2 lg:gap-y-2">
        {buttonsData.map((item, index) => (
          <div className="flex justify-center">
            <button
              className={`px-4 py-[10px] whitespace-nowrap text-[#4B4B4B] font-medium text-base ${
                switchDetails === index
                  ? "bg-[#4A13E7] text-white rounded-md"
                  : ""
              }`}
              key={index}
              onClick={() => setSwitchDetails(index)}
            >
              {item}
            </button>
          </div>
        ))}
      </div>
    </SettingLayout>
  );
};

export default SettingTopDataButtons;
