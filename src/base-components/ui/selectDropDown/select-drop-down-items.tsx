import { DropDownItemsProps } from "@/types";

export const SelectDropDownItems = ({
  items,
  onItemClick,
  containerClassName,
}: DropDownItemsProps) => {
  const handleItemClick = (itemValue: string) => {
    onItemClick(itemValue);
  };

  const optionClasses =
    "w-fit border border-borderColor bg-white shadow-[0px_3px_6px_#00000029] rounded-br-lg rounded-bl-lg max-h-52 overflow-y-auto text-gray hover:text-white font-medium hover:bg-borderColor cursor-pointer py-2";

  return (
    <>
      {items.map(({ item }, idx) => (
        <option
          key={idx}
          value={item.value}
          className="select_dropdown_items cursor-pointer"
          onClick={() => handleItemClick(item.value)}
        >
          {item.label}
        </option>
      ))}
    </>
  );
};
