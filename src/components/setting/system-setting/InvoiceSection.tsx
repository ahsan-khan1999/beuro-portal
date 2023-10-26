import React, { useState } from "react";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import SettingLayout from "../SettingLayout";

const InvoiceSection = () => {
  const dropDownItems = [
    { item: "Option 1" },
    { item: "Option 2" },
    { item: "Option 3" },
    { item: "Option 4" },
    { item: "Option 5" },
  ];

  const [isOverdueActive, setIsOverdueActive] = useState(false);
  const [selectedItem, setSelectedItem] = useState(dropDownItems[0].item);

  const handleItemSelected = (selectedItem: string) => {
    setSelectedItem(selectedItem);
  };

  const toggleOverdue = () => {
    setIsOverdueActive(!isOverdueActive);
  };

  return (
    <SettingLayout>
      <div className="mb-4">
        <p className="text-[#393939] font-normal text-[18px] my-3">
          Invoice Over Due
        </p>

        <div
          className={`border rounded-md py-4 px-[18px] flex justify-between items-center w-full cursor-pointer ${
            isOverdueActive ? "border-[#4A13E7]" : ""
          }`}
          onClick={toggleOverdue}
        >
          <span
            className={`text-base font-medium ${
              isOverdueActive ? "text-[#4A13E7]" : ""
            }`}
          >
            Automatically Mark Invoice Over Due
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill={isOverdueActive ? "#4A13E7" : "#BFBFBF"}
          >
            <path d="M7.2208 0C3.31035 0 0.128906 3.18137 0.128906 7.0919C0.128906 11.0024 3.31035 14.1839 7.2208 14.1839C11.1313 14.1839 14.3127 11.0024 14.3127 7.0919C14.3127 3.18137 11.1313 0 7.2208 0ZM11.2931 5.89402L6.83762 10.3495C6.64817 10.5389 6.39634 10.6432 6.12845 10.6432C5.86056 10.6432 5.60873 10.5389 5.41928 10.3495L3.14851 8.07872C2.95906 7.88927 2.85472 7.63744 2.85472 7.36955C2.85472 7.10159 2.95906 6.84976 3.14851 6.66031C3.33788 6.47087 3.58971 6.36652 3.85768 6.36652C4.12557 6.36652 4.37747 6.47087 4.56685 6.66039L6.12838 8.22184L9.87461 4.47561C10.0641 4.28616 10.3159 4.18189 10.5838 4.18189C10.8517 4.18189 11.1035 4.28616 11.2929 4.47561C11.6841 4.86678 11.6841 5.50299 11.2931 5.89402Z" />
          </svg>
        </div>

        {isOverdueActive && (
          <div className="mt-[22px] ">
            <p className="text-[14px] text-[#1E1E1E] font-normal mb-[6px]">
              Invoice Over Due Days Limit
            </p>
            <DropDown
              items={dropDownItems}
              onItemSelected={handleItemSelected}
              selectedItem={selectedItem}
              dropDownTextClassName="custom-text-style"
              dropDownIconClassName="custom-icon-style"
              dropDownDisabled={false}
              shouldNotSelectItem={false}
            />
          </div>
        )}
      </div>
    </SettingLayout>
  );
};

export default InvoiceSection;
