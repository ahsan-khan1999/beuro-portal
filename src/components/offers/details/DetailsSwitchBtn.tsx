import { useTranslation } from "next-i18next";
import React from "react";

interface DetailsSwitchBtnProps {
  switchDetails: string;
  setSwitchDetails: (value: string) => void;
}

const DetailsSwitchBtn: React.FC<DetailsSwitchBtnProps> = ({
  switchDetails,
  setSwitchDetails,
}) => {
  const { t: translate } = useTranslation();
  return (
    <div className="flex w-full">
      <button
        className={`bg-[#D9D9D9] px-5 py-[12px] text-[18px] w-full  font-normal border-b-[3px] rounded-tl-lg  ${
          switchDetails === "Activity"
            ? " border-[#4A13E7] text-[#4A13E7] bg-white"
            : "border-transparent text-[#8F8F8F]"
        }`}
        onClick={() => setSwitchDetails("Activity")}
      >
        {translate("offers.detail_buttons.activity")}
      </button>
      <button
        className={`bg-[#D9D9D9] px-5 w-full py-[12px] text-[18px]  font-normal border-b-[3px] rounded-tr-lg ${
          switchDetails === "Discounts"
            ? " border-[#4A13E7] text-[#4A13E7] bg-white"
            : "border-transparent text-[#8F8F8F]"
        }`}
        onClick={() => setSwitchDetails("Discounts")}
      >
        {translate("offers.detail_buttons.discount")}
      </button>
    </div>
  );
};

export default DetailsSwitchBtn;
