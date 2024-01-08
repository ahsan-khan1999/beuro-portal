import { useTranslation } from "next-i18next";
import React from "react";

export const SwitchTabs = ({
  switchDetails,
  setSwitchDetails,
}: {
  switchDetails: string;
  setSwitchDetails: (item: string) => void;
}) => {
  const { t: translate } = useTranslation();

  const tabs = [
    `${translate("switch_tabs.offer")}`,
    `${translate("switch_tabs.contract")}`,
    `${translate("switch_tabs.invoices")}`,
    `${translate("switch_tabs.receipt")}`,
  ];

  return (
    <div className="flex gap-[2px]">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`bg-white w-full mlg:min-w-[173px] text-center py-3 text-base font-medium border-b-[3px] ${
            switchDetails === tab
              ? " border-[#4A13E7] text-[#4A13E7]"
              : "border-transparent text-[#8F8F8F]"
          }`}
          onClick={() => setSwitchDetails(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
