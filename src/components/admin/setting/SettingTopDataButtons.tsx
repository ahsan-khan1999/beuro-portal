import React from "react";
import SettingLayout from "./SettingLayout";
import { useTranslation } from "next-i18next";

const SettingTopDataButtons = ({
  switchDetails,
  setSwitchDetails,
}: {
  switchDetails: number;
  setSwitchDetails: (item: number) => void;
}) => {
  const { t: translate } = useTranslation();
  const buttonsData: string[] = [
    `${translate("admin.settings.tabs_heading.account")}`,
    `${translate("admin.settings.tabs_heading.payment")}`,
    `${translate("admin.settings.tabs_heading.mail")}`,
  ];

  return (
    <SettingLayout>
      <div className="grid xs:grid-cols-[minmax(170px,_170px)_minmax(190px,_190px)_minmax(180px,_180px)] mlg:grid-cols-[minmax(200px,_200px)_minmax(200px,_200px)_minmax(200px,_200px)]">
        {buttonsData.map((item, index) => (
          <button
            className={`w-fit px-4 py-[10px] text-[#4B4B4B] font-medium text-base ${
              switchDetails === index
                ? "bg-[#4A13E7] text-white rounded-md shadow-lg"
                : ""
            }`}
            key={index}
            onClick={() => setSwitchDetails(index)}
          >
            {item}
          </button>
        ))}
      </div>
    </SettingLayout>
  );
};

export default SettingTopDataButtons;
