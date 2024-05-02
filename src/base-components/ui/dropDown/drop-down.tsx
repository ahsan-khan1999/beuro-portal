import { useEffect, useState } from "react";
import { DropDownItems } from "./drop-down-items";
import { DropDownProps } from "@/types";
import { useOutsideClick } from "@/utils/hooks";
import { combineClasses } from "@/utils/utility";
import { DropDownNonFillIcon } from "@/assets/svgs/components/drop-down-icon-non-fill";
import { AnimatePresence } from "framer-motion";

export const DropDown = ({
  label,
  items,
  onItemSelected,
  selectedItem: defaultSelectedItem,
  children,
  dropDownClassName,
  dropDownTextClassName,
  dropDownItemsContainerClassName,
  dropDownIconClassName,
  dropDownDisabled = false,
  shouldNotSelectItem = false,
  isLastIndex,
  isSecondLastIndex,
  isLead,
  isOffer,
}: DropDownProps & {
  isLastIndex?: boolean;
  isSecondLastIndex?: boolean;
  isLead?: boolean;
  isOffer?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(defaultSelectedItem);

  const toggleDropDown = (item: string) => {
    onItemSelected(item);
    // !shouldNotSelectItem && setSelectedItem(item);
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setSelectedItem(defaultSelectedItem);
  }, [defaultSelectedItem]);

  const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const defaultClasses =
    "flex items-center bg-white px-3 py-[10px] w-full min-h-8 border border-lightGray rounded-lg cursor-pointer";
  const buttonClasses = combineClasses(defaultClasses, dropDownClassName);
  const textClasses = combineClasses(
    `text-sm font-medium text-white ${
      dropDownDisabled ? "text-lightGray" : ""
    }`,
    dropDownTextClassName
  );

  return (
    <div
      className={`flex flex-col gap-y-2 w-full ${
        dropDownDisabled ? "pointer-events-none" : ""
      }`}
      ref={dropdownRef}
    >
      {label && <label className="text-sm text-gray">{label}</label>}
      <div className="relative w-full">
        <div
          aria-expanded={isOpen}
          className={`${buttonClasses}`}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {children}
          <span className={textClasses}>{selectedItem}</span>
          <div>
            <DropDownNonFillIcon
              isOpen={isOpen}
              className={dropDownIconClassName}
            />
          </div>
        </div>
        <AnimatePresence>
          {isOpen && (
            <DropDownItems
              items={items}
              onItemClick={toggleDropDown}
              containerClassName={dropDownItemsContainerClassName}
              isLastIndex={isLastIndex}
              isSecondLastIndex={isSecondLastIndex}
              isOffer={isOffer}
              isLead={isLead}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
