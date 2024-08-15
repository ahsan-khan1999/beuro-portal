import { DropDownNonFillIcon } from "@/assets/svgs/components/drop-down-icon-non-fill";
import { OptionsFieldProps } from "@/types/global";
import React, { useEffect, useState } from "react";
import { combineClasses } from "@/utils/utility";
import { motion, AnimatePresence } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks";
import searchIcon from "@/assets/svgs/search-icon.png";
import Image from "next/image";
import { useRouter } from "next/router";

export default function SelectField({
  title,
  label,
  options,
  border,
  handleChange,
  value,
  dropDownIconClassName,
  containerClassName,
  isSearch,
  labelClassName,
}: OptionsFieldProps) {
  const containerClasses = combineClasses(
    "relative flex items-center justify-center min-w-[120px] w-fit",
    containerClassName
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

  const handleItemSelected = (selectedValue: string, selectedIndex: number) => {
    options.forEach(({ label, value }, index) => {
      if (selectedIndex === index) {
        setSelectedLabel(label);
        handleChange(selectedValue);
      }
    });
  };

  useEffect(() => {
    const querySort = router.query.sort as string;
    const queryNoteType = router.query.noteType as string;

    const selectedSortOption = options.find(
      (option) => option.value === querySort
    );
    const selectedNoteTypeOption = options.find(
      (option) => option.value === queryNoteType
    );

    if (selectedSortOption && selectedNoteTypeOption) {
      setSelectedLabel(
        `${selectedSortOption.label}, ${selectedNoteTypeOption.label}`
      );
    } else if (selectedSortOption) {
      setSelectedLabel(selectedSortOption.label);
    } else if (selectedNoteTypeOption) {
      setSelectedLabel(selectedNoteTypeOption.label);
    } else {
      setSelectedLabel(label || "");
    }
  }, [router.query.sort, router.query.noteType, label, options]);

  return (
    <div className={containerClasses} ref={ref}>
      <div
        className="flex justify-between items-center cursor-pointer px-[10px] py-2 bg-white rounded-lg min-w-[105px] w-fit"
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
            className="bg-white flex-col absolute top-[40px] border-[1px] border-lightGray rounded-lg w-full right-0 p-2 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {isSearch && (
              <div className="flex items-center border border-lightGray rounded-md w-full bg-[#f6f6f7]">
                <Image
                  src={searchIcon}
                  alt="Search Icon"
                  className="ml-1 w-4 h-4 absolute"
                  width={24}
                  height={8}
                />
                <input
                  placeholder={translate("common.search")}
                  className="w-full ps-6 focus:outline-primary focus:outline rounded-md p-1 placeholder:text-sm bg-[#f6f6f7] "
                />
              </div>
            )}
            <div
              className="mt-2 h-full max-h-[150px] min-h-fit overflow-x-hidden overflow-y-auto"
              id="dropdownSerchBar"
            >
              <div className="flex-col space-y-2">
                {options.map(({ label, value }, idx) => (
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
