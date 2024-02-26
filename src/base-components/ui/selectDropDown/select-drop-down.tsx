import { SelectDropDownProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import { useEffect, useState } from "react";
import { SelectDropDownItems } from "./select-drop-down-items";

export const SelectDropDown = ({
  items,
  onItemSelected,
  selectedItem: defaultSelectedItem,
  dropDownClassName,
  dropDownItemsContainerClassName,
}: SelectDropDownProps) => {
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
    "outline-none bg-white px-1 py-[10px] w-full min-h-10 border border-lightGray rounded-lg";
  const buttonClasses = combineClasses(defaultClasses, dropDownClassName);

  const handleDropdownToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <select
        className={`dropdown_select cursor-pointer text-white ${buttonClasses}`}
        aria-expanded={isOpen}
        value={selectedItem}
        onChange={handleSelectChange}
        onClick={handleDropdownToggle}
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
