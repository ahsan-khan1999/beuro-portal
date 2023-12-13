import { DropDownItemsProps } from "@/types";

export const DropDownItems = ({ items, onItemClick }: DropDownItemsProps) => {
  const handleItemClick = (item: string) => {
    onItemClick(item);
  };
  return (
    <ul className="absolute z-10 w-fit border border-borderColor bg-white shadow-[0px_3px_6px_#00000029] rounded-br-lg rounded-bl-lg max-h-52 overflow-scroll">
      {items.map(({ item }, idx) => (
        <li
          key={idx}
          role="menuitem"
          className="text-gray font-medium hover:bg-borderColor cursor-pointer px-4 py-2"
          onClick={() => handleItemClick(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
