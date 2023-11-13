import { useState } from "react";
import { DropDownItems } from "./drop-down-items";
import { DropDownProps } from "@/types";
import { useOutsideClick } from "@/utils/hooks";
import { combineClasses } from "@/utils/utility";
import { DropDownNonFillIcon } from "@/assets/svgs/components/drop-down-icon-non-fill";

export const DropDown = ({
  label,
  items,
  onItemSelected,
  selectedItem: defaultSelectedItem,
  children,
  dropDownClassName,
  dropDownTextClassName,
  dropDownIconClassName,
  dropDownDisabled = false,
  shouldNotSelectItem = false,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(defaultSelectedItem);

  const toggleDropDown = (item: string) => {
    onItemSelected(item);
    !shouldNotSelectItem && setSelectedItem(item);
    setIsOpen((prevState) => !prevState);
  };

  const dropdownRef = useOutsideClick<HTMLDivElement>(() => setIsOpen(false));

  const defaultClasses =
    "flex items-center justify-between bg-white px-4 py-[10px] w-full min-h-10 border border-lightGray rounded-lg";
  const buttonClasses = combineClasses(defaultClasses, dropDownClassName);
  const textClasses = combineClasses(
    `text-sm font-medium text-dark ${dropDownDisabled ? 'text-lightGray': ''}`,
    dropDownTextClassName
  );
    
  return (
    <div className={`flex flex-col w-full gap-y-2 ${dropDownDisabled ? 'pointer-events-none' : ''}`} ref={dropdownRef}>
      {label && <label className="text-sm text-gray">{label}</label>}
      <div className="relative w-full">
        <button
          aria-expanded={isOpen}
          className={`${buttonClasses}`}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          {children}
          <span className={textClasses}>{selectedItem}</span>
          <DropDownNonFillIcon isOpen={isOpen} className={dropDownIconClassName} />
        </button>
        {isOpen && <DropDownItems items={items} onItemClick={toggleDropDown} />}
      </div>
    </div>
  );
};
