import React from "react";

interface DetailsSwitchBtnProps {
  switchDetails: string;
  setSwitchDetails: (value: string) => void;
}

const DetailsSwitchBtn: React.FC<DetailsSwitchBtnProps> = ({
  switchDetails,
  setSwitchDetails,
}) => {
  return (
    <div className="flex">
      <button
        className={`bg-[#D9D9D9] px-[55px] py-[12px] text-[18px]  font-normal border-b-[3px] rounded-tl-lg  ${
          switchDetails === "Activity"
            ? " border-[#4A13E7] text-[#4A13E7] bg-white"
            : "border-transparent text-[#8F8F8F]"
        }`}
        onClick={() => setSwitchDetails("Activity")}
      >
        Activity
      </button>
      <button
        className={`bg-[#D9D9D9] px-[55px] py-[12px] text-[18px]  font-normal border-b-[3px] rounded-tr-lg ${
          switchDetails === "Discounts"
            ? " border-[#4A13E7] text-[#4A13E7] bg-white"
            : "border-transparent text-[#8F8F8F]"
        }`}
        onClick={() => setSwitchDetails("Discounts")}
      >
        Discounts
      </button>
    </div>
  );
};

export default DetailsSwitchBtn;
