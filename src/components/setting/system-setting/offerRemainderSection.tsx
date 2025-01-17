import SettingLayout from "../SettingLayout";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { useAppSelector } from "@/hooks/useRedux";
import { SystemSettingDataProps } from "@/types/settings";
import { staticEnums } from "@/utils/static";
import { AnimatePresence, motion } from "framer-motion";
import { SetStateAction, useRef } from "react";
import { useTranslation } from "next-i18next";

export const OfferRemainderSection = ({
  systemSetting,
  setSystemSetting,
}: {
  systemSetting: SystemSettingDataProps;
  setSystemSetting: SetStateAction<any>;
}) => {
  const { systemSettings } = useAppSelector((state) => state.settings);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t: translate } = useTranslation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newValue = inputRef?.current?.value;
    if (newValue) {
      setSystemSetting({
        ...systemSetting,
        remainderText: newValue,
      });
      inputRef.current.value = "";
    }
  };

  const handleItemSelected = (selectedItem: string) => {
    setSystemSetting({
      ...systemSetting,
      offerReminderFrequency: selectedItem,
    });
  };

  return (
    <SettingLayout>
      <div className="px-6 py-5 bg-white">
        <div className="rounded-lg px-2 py-3 bg-[#EDF4FF]">
          <p className="text-[#393939] font-semibold text-base mb-3">
            {translate("setting.offer_remainder")}
          </p>

          <p className="text-[#1E1E1E] text-sm font-normal mt-[14px] mb-2">
            {translate("setting.remainder_text")}
          </p>

          <input
            ref={inputRef}
            placeholder="1"
            defaultValue={systemSettings?.reminderText}
            key={systemSettings?.reminderText}
            type="text"
            onChange={(e) => {
              setSystemSetting({
                ...systemSetting,
                reminderText: e.target.value,
              });
            }}
            className="border border-[#BFBFBF] rounded-md w-full text-sm pr-8 pl-3 py-2 focus:outline-none placeholder:text-[#222B45] text-[#222B45] text-[13px] focus:border-[#6665FF]"
          />

          <AnimatePresence>
            <motion.div
              className="mt-[22px]"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className="text-[14px] text-[#1E1E1E] font-normal mb-[6px]">
                {translate("setting.remainder_freq")}
              </p>

              <DropDown
                items={Object.keys(staticEnums["remainderDays"])?.map(
                  (item) => ({
                    item: {
                      label: item,
                      value: item,
                    },
                  })
                )}
                onItemSelected={handleItemSelected}
                selectedItem={systemSetting?.offerReminderFrequency?.toString()}
                dropDownTextClassName="custom-text-style text-black"
                dropDownIconClassName="custom-icon-style"
                dropDownDisabled={false}
                shouldNotSelectItem={false}
                dropDownClassName="!h-[42px] justify-between"
                dropDownItemsContainerClassName="w-full"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SettingLayout>
  );
};
