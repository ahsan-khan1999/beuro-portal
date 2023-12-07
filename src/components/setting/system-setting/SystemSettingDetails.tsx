import React, { useState } from "react";
import TaxVerifiedComp from "./TaxVerifiedComp";
import InvoiceSection from "./InvoiceSection";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import ConnectWithBuro from "./ConnectWithBuro";
import SettingLayout from "../SettingLayout";
import { useTranslation } from "next-i18next";

const SystemSettingDetails = ({
  addTaxHandler,
  exclusiveTaxHandler,
}: {
  addTaxHandler: () => void;
  exclusiveTaxHandler: () => void;
}) => {
  const dropDownItems = [{ item: " EUR - Euro" }];
  const [selectedItem, setSelectedItem] = useState(dropDownItems[0].item);
  const { t: translate } = useTranslation();

  const handleItemSelected = (selectedItem: string) => {
    setSelectedItem(selectedItem);
  };

  return (
    <>
      <TaxVerifiedComp
        addTaxHandler={addTaxHandler}
        exclusiveTaxHandler={exclusiveTaxHandler}
      />
      <div className="my-2">
        <InvoiceSection />
      </div>

      <SettingLayout>
        <div className="my-3 ">
          <p className="text-[#393939] font-normal text-[18px] my-3">
            {translate("setting.system_setting.currency")}
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

      <div className="mt-2">
        <ConnectWithBuro />
      </div>

      <div className="mt-3 ml-[31px]">
        <button className="text-white text-base font-medium px-6 py-[10px] bg-[#4A13E7] rounded-md">
          Save Setting
        </button>
      </div>
    </>
  );
};

export default SystemSettingDetails;
