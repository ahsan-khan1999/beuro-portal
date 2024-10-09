import { DropDownNonFillIcon } from "@/assets/svgs/components/drop-down-icon-non-fill";
import { BooleanOptionsFieldProps } from "@/types/global";
import React, { useEffect, useState } from "react";
import { combineClasses } from "@/utils/utility";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks";
import { useRouter } from "next/router";

export default function BooleanSelectField({
  label,
  options,
  handleChange,
  dropDownIconClassName,
  containerClassName,
  labelClassName,
  dropdownClassName,
}: BooleanOptionsFieldProps) {
  const containerClasses = combineClasses(
    "relative flex items-center justify-center min-w-[120px] w-fit z-10",
    containerClassName
  );

  const dropdownClasses = combineClasses(
    "bg-white flex-col absolute top-[40px] border-[1px] border-lightGray rounded-lg w-full right-0 p-2 shadow-lg",
    dropdownClassName
  );

  const labelDefualtClasses = combineClasses(
    "text-dark text-sm font-normal w-fit",
    labelClassName
  );

  const [selectedLabel, setSelectedLabel] = useState<string>(label || "");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const hanldeClose = () => {
    setIsOpen(false);
  };

  const ref = useOutsideClick<HTMLDivElement>(hanldeClose);

  const handleItemSelected = (
    selectedValue: boolean,
    selectedIndex: number
  ) => {
    options?.forEach(({ label, value }, index) => {
      if (selectedIndex === index) {
        setSelectedLabel(label);
        handleChange(selectedValue);
      }
    });
  };

  const queryAppointment = router.query.isAppointmentCreated;
  const queryOffer = router.query.isOfferCreated;

  useEffect(() => {
    const queryAppointmentValue =
      queryAppointment === "true"
        ? true
        : queryAppointment === "false"
        ? false
        : undefined;

    const queryOfferValue =
      queryOffer === "true" ? true : queryOffer === "false" ? false : undefined;

    const selectedAppointmentOption = options?.find(
      (option) => option.value === queryAppointmentValue
    );

    const selectedOfferOption = options?.find(
      (option) => option.value === queryOfferValue
    );

    if (selectedAppointmentOption) {
      setSelectedLabel(selectedAppointmentOption.label);
    } else if (selectedOfferOption) {
      setSelectedLabel(selectedOfferOption.label);
    } else {
      setSelectedLabel(label || "");
    }
  }, [queryAppointment, queryOffer, label, options]);

  return (
    <div className={containerClasses} ref={ref}>
      <div
        className="flex justify-between items-center cursor-pointer px-[10px] py-2 bg-white rounded-lg border border-[#ccc] min-w-[105px] w-fit"
        onClick={handleToggle}
      >
        <span className={labelDefualtClasses}>{selectedLabel}</span>
        <DropDownNonFillIcon
          label={label}
          isOpen={isOpen}
          className={dropDownIconClassName + "flex my-auto ml-1"}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={dropdownClasses}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div
              style={{ maxHeight: "150px" }}
              className="mt-2 min-h-fit overflow-x-hidden overflow-y-auto"
              id="dropdownSerchBar"
            >
              <div className="flex-col space-y-2">
                {options?.map(({ label, value }, idx) => (
                  <div
                    className="flex justify-start px-2 py-1 hover:bg-[#eaebec] rounded-sm cursor-pointer mr-1 hoverTransetion"
                    key={idx}
                    onClick={() => {
                      handleItemSelected(value, idx);
                      setIsOpen(false);
                    }}
                  >
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
