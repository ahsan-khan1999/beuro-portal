import React, { useEffect, useState } from "react";
import SettingLayout from "./SettingLayout";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const SettingTopDataButtons = ({
  switchDetails,
  setSwitchDetails,
}: {
  switchDetails: number;
  setSwitchDetails: (item: number) => void;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  const [selectedTab, setSelectedTab] = useState<number | null>(switchDetails);
  const tab = router.query.tab;

  useEffect(() => {
    if (tab && !Array.isArray(tab) && !isNaN(Number(tab))) {
      setSwitchDetails(parseInt(tab as string, 10));
      setSelectedTab(parseInt(tab as string, 10));
    } else {
      setSwitchDetails(0);
      setSelectedTab(0);
    }
  }, [router.query]);

  const buttonsData: string[] = [
    `${translate("setting.steps_heading.account_setting")}`,
    `${translate("setting.steps_heading.system_setting")}`,
    `${translate("setting.steps_heading.templates")}`,
    `${translate("setting.steps_heading.follow_up_setting")}`,
    `${translate("setting.steps_heading.mail_setting")}`,
    `${translate("setting.steps_heading.qr_settings")}`,
    `${translate("setting.steps_heading.general_setting")}`,
  ];

  const handleTabClick = (index: number) => {
    setSelectedTab(index);
    setSwitchDetails(index);
    router.push(`?tab=${index}`, undefined, { shallow: true });
  };

  return (
    <SettingLayout containerClassName="bg-white py-3">
      <div className="grid 2xl:grid-cols-7 xl:grid-cols-6 lg:grid-cols-3 grid-cols-2 lg:gap-y-2">
        {buttonsData.map((item, index) => (
          <div className="flex justify-center" key={index}>
            <button
              className={`px-4 py-[10px] whitespace-nowrap text-[#4B4B4B] font-medium text-base ${
                selectedTab === index
                  ? "bg-[#4A13E7] text-white rounded-md"
                  : ""
              }`}
              key={index}
              onClick={() => handleTabClick(index)}
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
