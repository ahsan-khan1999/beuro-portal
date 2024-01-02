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
    `${translate("admin.settings.tabs_heading.account")}`,
    `${translate("admin.settings.tabs_heading.payment")}`,
    `${translate("admin.settings.tabs_heading.mail")}`,
  ];

  // State to track the active button index (set to 0 for the first item by default)
  const [activeButton, setActiveButton] = useState(0);

  return (
    <SettingLayout>
      <div className="grid grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 lg:flex-row ">
      {buttonsData.map((item, index) => (
        <button
          className={`w-fit px-4 py-[10px] text-[#4B4B4B] font-medium text-base ${
            switchDetails === index ? "bg-[#4A13E7] text-white rounded-md" : ""
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
