import React, { useState } from "react";
import SettingLayout from "./SettingLayout";

const SettingTopDataButtons = ({
  switchDetails,
  setSwitchDetails,
}: {
  switchDetails: number; // Change the type to number
  setSwitchDetails: (item: number) => void; // Change the type to number
}) => {
  const buttonsData: string[] = [
    "Account Setting",
    "System Setting",
    "Templates",
    "Follow Up Setting",
    "Billing",
    "Mail Setting",
  ];

  // State to track the active button index (set to 0 for the first item by default)
  const [activeButton, setActiveButton] = useState(0);

  return (
    <SettingLayout>
      {buttonsData.map((item, index) => (
        <button
          className={`px-4 py-[10px] text-[#4B4B4B] font-medium text-base ${
            switchDetails === index ? "bg-[#4A13E7] text-white rounded-md" : ""
          }`}
          style={{
            marginRight: index === buttonsData.length - 1 ? "0" : "49px",
          }}
          key={index}
          onClick={() => setSwitchDetails(index)}
        >
          {item}
        </button>
      ))}
    </SettingLayout>
  );
};

export default SettingTopDataButtons;
