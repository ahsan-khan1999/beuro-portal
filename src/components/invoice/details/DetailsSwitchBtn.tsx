import { useTranslation } from "next-i18next";
import React from "react";

const DetailsSwitchBtn = ({
  switchDetails,
  setSwitchDetails,
}: {
  switchDetails: string;
  setSwitchDetails: (item: string) => void;
}) => {
  const { t: translate } = useTranslation();

  return (
    <div className="flex gap-[2px]">
      <button
        className={`bg-white px-[55px] py-[12px] text-base font-medium border-b-[3px] ${
          switchDetails === "Invoice"
            ? " border-[#4A13E7] text-[#4A13E7]"
            : "border-transparent text-[#8F8F8F]"
        }`}
        onClick={() => setSwitchDetails("Invoice")}
      >
        {translate("switch_tabs.invoice")}
      </button>
      <button
        className={`bg-white px-[55px] py-[12px] text-base font-medium border-b-[3px] ${
          switchDetails === "Receipt"
            ? " border-[#4A13E7] text-[#4A13E7]"
            : "border-transparent text-[#8F8F8F]"
        }`}
        onClick={() => setSwitchDetails("Receipt")}
      >
        {translate("switch_tabs.receipt")}
      </button>
    </div>
  );
};

export default DetailsSwitchBtn;
