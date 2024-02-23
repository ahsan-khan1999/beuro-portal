import { DropDownProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import { useEffect, useState } from "react";
import { SelectDropDownItems } from "./select-drop-down-items";

export const SelectDropDown = ({
  label,
  items,
  onItemSelected,
  selectedItem: defaultSelectedItem,
  dropDownClassName,
  dropDownTextClassName,
  dropDownItemsContainerClassName,
  dropDownIconClassName,
  dropDownDisabled = false,
  shouldNotSelectItem = false,
}: DropDownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState(defaultSelectedItem);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedItem = event.target.value;
    setSelectedItem(newSelectedItem);
    onItemSelected(newSelectedItem);
  };

  useEffect(() => {
    setSelectedItem(defaultSelectedItem);
  }, [defaultSelectedItem]);

  const defaultClasses =
    "outline-none bg-white px-3 py-[10px] w-full min-h-10 border border-lightGray rounded-lg";
  const buttonClasses = combineClasses(defaultClasses, dropDownClassName);

  const textClasses = combineClasses(
    `text-sm font-medium text-dark ${dropDownDisabled ? "text-lightGray" : ""}`,
    dropDownTextClassName
  );

  return (
    <>
      <select
        className={`cursor-pointer relative z-10 text-white ${buttonClasses}`}
        aria-expanded={isOpen}
        value={selectedItem}
        onChange={handleSelectChange}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <SelectDropDownItems
          items={items}
          onItemClick={onItemSelected}
          containerClassName={dropDownItemsContainerClassName}
        />
      </select>
    </>
  );
};
