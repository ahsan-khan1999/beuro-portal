import React, { useState } from "react";
import SettingLayout from "../SettingLayout";
import MailSettingForm from "./mail-setting-form";

const MailSetting = ({handleCreation} : {handleCreation: Function}) => {
  const tabsData: string[] = [
    "Use System Mail Configuration",
    "Use Own Mail Configuration",
  ];

  // State to manage the selected tab
  const [selectedTab, setSelectedTab] = useState(0);

  // Function to handle tab selection
  const handleTabSelect = (index: number) => {
    setSelectedTab(index);
  };

  return (
    <SettingLayout>
      <div className="ml-3 mb-3">
        <div className="flex gap-[40px] mt-4 mb-[36px]">
          {tabsData.map((item, index) => (
            <div
              key={index}
              className={`flex gap-3 items-center cursor-pointer`}
              onClick={() => handleTabSelect(index)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill={selectedTab === index ? "#4A13E7" : "#4B4B4B"}
              >
                <path d="M7.2208 0C3.31035 0 0.128906 3.18137 0.128906 7.0919C0.128906 11.0024 3.31035 14.1839 7.2208 14.1839C11.1313 14.1839 14.3127 11.0024 14.3127 7.0919C14.3127 3.18137 11.1313 0 7.2208 0ZM11.2931 5.89402L6.83762 10.3495C6.64817 10.5389 6.39634 10.6432 6.12845 10.6432C5.86056 10.6432 5.60873 10.5389 5.41928 10.3495L3.14851 8.07872C2.95906 7.88927 2.85472 7.63744 2.85472 7.36955C2.85472 7.10159 2.95906 6.84976 3.14851 6.66031C3.33788 6.47087 3.58971 6.36652 3.85768 6.36652C4.12557 6.36652 4.37747 6.47087 4.56685 6.66039L6.12838 8.22184L9.87461 4.47561C10.0641 4.28616 10.3159 4.18189 10.5838 4.18189C10.8517 4.18189 11.1035 4.28616 11.2929 4.47561C11.6841 4.86678 11.6841 5.50299 11.2931 5.89402Z" />
              </svg>
              <span className={`text-base font-normal text-[#4B4B4B]`}>
                {item}
              </span>
            </div>
          ))}
        </div>

        {selectedTab === 1 && <MailSettingForm handleCreation={handleCreation}/>}

        {selectedTab === 0 && (
          <button className="text-base font-medium text-white bg-[#4A13E7] rounded-lg p-[10px] w-[150px]">
            Save Setting
          </button>
        )}
      </div>
    </SettingLayout>
  );
};

export default MailSetting;
