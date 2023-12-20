import { DropDownItemsProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import { AnimatePresence, motion } from "framer-motion";

export const DropDownItems = ({
  items,
  onItemClick,
  containerClassName,
}: DropDownItemsProps) => {
  const handleItemClick = (item: string) => {
    onItemClick(item);
  };

  const containerDefaultClasses =
    "absolute z-10 w-full border border-borderColor bg-white shadow-[0px_3px_6px_#00000029] rounded-br-lg rounded-bl-lg max-h-52 overflow-y-auto";
  const containerClasses = combineClasses(
    containerDefaultClasses,
    containerClassName
  );
  return (
    <motion.ul
      className={containerClasses}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
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
    </motion.ul>
  );
};
