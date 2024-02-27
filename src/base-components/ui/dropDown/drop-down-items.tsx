import { DropDownItemsProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import { motion } from "framer-motion";
import dropdownIcon from "@/assets/pngs/drop-down-icon.png"

export const DropDownItems = ({
  items,
  onItemClick,
  containerClassName,
  isLastIndex,
  isSecondLastIndex
}: DropDownItemsProps & { isLastIndex?: boolean,isSecondLastIndex?:boolean }) => {
  const handleItemClick = (item: string) => {
    onItemClick(item);
  };
  console.log(isSecondLastIndex,isLastIndex);
  
  const containerDefaultClasses =
    `absolute ${(isLastIndex || isSecondLastIndex) && "!-top-20"}  z-10 w-fit border border-borderColor bg-white shadow-[0px_3px_6px_#00000029] rounded-br-lg rounded-bl-lg max-h-52 overflow-y-auto`;
  let containerClasses = combineClasses(
    containerDefaultClasses,
    containerClassName
  );

  return (
    <motion.ul
      className={containerClasses}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {items.map(({ item }, idx) => {
        return (

          <li
            key={idx}
            className="text-gray hover:text-white font-medium hover:bg-borderColor cursor-pointer px-3 py-2"
            onClick={() => handleItemClick(`${item.value}` || "")}
          >
            {item.label}
          </li>
        )
      })}
    </motion.ul>
  );
};
