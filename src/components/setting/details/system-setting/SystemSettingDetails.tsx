import React, { useState } from "react";
import TaxVerifiedComp from "./TaxVerifiedComp";
import InvoiceSection from "./InvoiceSection";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import SettingLayout from "../../SettingLayout";
import ConnectWithBuro from "./ConnectWithBuro";

const SystemSettingDetails = () => {
  const dropDownItems = [{ item: " EUR - Euro" }];
  const [selectedItem, setSelectedItem] = useState(dropDownItems[0].item);

  const handleItemSelected = (selectedItem: string) => {
    setSelectedItem(selectedItem);
  };

  return (
    <>
      <TaxVerifiedComp />
      <div className="my-2">
        <InvoiceSection />
      </div>

      <SettingLayout>
        <div className="my-3 ">
          <p className="text-[#393939] font-normal text-[18px] my-3">
            Currency
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
      </SettingLayout>

      <div className="my-2">
        <ConnectWithBuro />
      </div>
    </>
  );
};

export default SystemSettingDetails;
