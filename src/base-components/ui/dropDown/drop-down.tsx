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
  isThirdLastIndex,
  isLead,
  isPayment,
  isOffer,
  isAdminCustomer,
  isContract,
  isMobileLead,
}: DropDownProps & {
  isLastIndex?: boolean;
  isSecondLastIndex?: boolean;
  isThirdLastIndex?: boolean;
  isLead?: boolean;
  isPayment?: boolean;
  isOffer?: boolean;
  isAdminCustomer?: boolean;
  isContract?: boolean;
  isMobileLead?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(defaultSelectedItem);

  const toggleDropDown = (item: string) => {
    onItemSelected(item);
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
      className={`flex flex-col gap-y-2 ${isMobileLead ? "w-fit" : "w-full"} ${
        dropDownDisabled ? "pointer-events-none" : ""
      }`}
      ref={dropdownRef}
    >
      {label && <label className="text-sm text-gray">{label}</label>}
      <div className={`relative ${isMobileLead ? "w-fit" : "w-full"}`}>
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
              isThirdLastIndex={isThirdLastIndex}
              isOffer={isOffer}
              isLead={isLead}
              isPayment={isPayment}
              isAdminCustomer={isAdminCustomer}
              isContract={isContract}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
