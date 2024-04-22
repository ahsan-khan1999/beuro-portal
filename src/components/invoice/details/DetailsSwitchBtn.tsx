import React from "react";
import { useTranslation } from "next-i18next";

const DetailsSwitchBtn = ({
  activeTab,
  onComponentChange,
}: {
  activeTab: string;
  onComponentChange: (item: string) => void;
}) => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex gap-[2px]">
      <button
        className={`bg-white px-[55px] py-[12px] text-base font-medium border-b-[3px] ${
          activeTab === "invoice"
            ? " border-[#4A13E7] text-[#4A13E7]"
            : "border-transparent text-[#8F8F8F]"
        }`}
        onClick={() => onComponentChange("invoice")}
      >
        {translate("switch_tabs.invoice")}
      </button>
      <button
        className={`bg-white px-[55px] py-[12px] text-base font-medium border-b-[3px] ${
          activeTab === "receipt"
            ? " border-[#4A13E7] text-[#4A13E7]"
            : "border-transparent text-[#8F8F8F]"
        }`}
        onClick={() => onComponentChange("receipt")}
      >
        {translate("switch_tabs.receipt")}
      </button>
    </div>
  );
};

export default DetailsSwitchBtn;
