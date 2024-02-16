import { AnimatePresence, motion } from "framer-motion";
import SettingLayout from "../SettingLayout";
import { staticEnums } from "@/utils/static";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { SystemSettingDataProps } from "@/types/settings";
import { SetStateAction } from "react";
import { useTranslation } from "next-i18next";

export const WarningDays = ({
  systemSetting,
  setSystemSetting,
}: {
  systemSetting: SystemSettingDataProps;
  setSystemSetting: SetStateAction<any>;
}) => {
  const handleSecondWarningSelected = (selectedItem: string) => {
    setSystemSetting({
      ...systemSetting,
      secondWarningDays: selectedItem,
    });
  };

  const handlethirdWarningSelected = (selectedItem: string) => {
    setSystemSetting({
      ...systemSetting,
      thirdWarningDays: selectedItem,
    });
  };

  const { t: translate } = useTranslation();

  return (
    <div>
      <AnimatePresence>
        <motion.div
          className="mt-[22px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[14px] text-[#1E1E1E] font-normal mb-[6px]">
            {translate("setting.second_warnings")}
          </p>

          <DropDown
            items={Object.keys(staticEnums["remainderDays"]).map((item) => ({
              item: {
                label: item,
                value: item,
              },
            }))}
            onItemSelected={handleSecondWarningSelected}
            selectedItem={systemSetting?.secondWarningDays?.toString()}
            dropDownTextClassName="custom-text-style"
            dropDownIconClassName="custom-icon-style"
            dropDownDisabled={false}
            shouldNotSelectItem={false}
            dropDownClassName="!h-[42px] justify-between"
            dropDownItemsContainerClassName="w-full"
          />
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        <motion.div
          className="mt-[22px]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          <p className="text-[14px] text-[#1E1E1E] font-normal mb-[6px]">
            {translate("setting.third_warnings")}
          </p>

          <DropDown
            items={Object.keys(staticEnums["remainderDays"]).map((item) => ({
              item: {
                label: item,
                value: item,
              },
            }))}
            onItemSelected={handlethirdWarningSelected}
            selectedItem={systemSetting?.thirdWarningDays?.toString()}
            dropDownTextClassName="custom-text-style"
            dropDownIconClassName="custom-icon-style"
            dropDownDisabled={false}
            shouldNotSelectItem={false}
            dropDownClassName="!h-[42px] justify-between"
            dropDownItemsContainerClassName="w-full"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
