import { DropDownItemsProps } from "@/types";
import { combineClasses } from "@/utils/utility";

export const DropDownItems = ({
  items,
  onItemClick,
  containerClassName,
}: DropDownItemsProps) => {
  const handleItemClick = (item: string) => {
    onItemClick(item);
  };
  const containerDefaultClasses =
    "fixed z-10 w-full border border-borderColor bg-white shadow-[0px_3px_6px_#00000029] rounded-br-lg rounded-bl-lg max-h-52 overflow-y-auto";
  const containerClasses = combineClasses(
    containerDefaultClasses,
    containerClassName
  );
  return (
    <ul className={containerClasses}>
      {items.map(({ item }, idx) => (
        <li
          key={idx}
          role="menuitem"
          className="text-gray hover:text-white font-medium hover:bg-borderColor cursor-pointer px-4 py-2"
          onClick={() => handleItemClick(item)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
