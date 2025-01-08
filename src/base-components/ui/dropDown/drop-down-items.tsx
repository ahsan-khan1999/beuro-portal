import { DropDownItemsProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import { motion } from "framer-motion";

export const DropDownItems = ({
  items,
  onItemClick,
  containerClassName,
  isLastIndex,
  isSecondLastIndex,
  isThirdLastIndex,
  isOffer,
  isLead,
  isPayment,
  isAdminCustomer,
  isContract,
  selectedItem,
}: DropDownItemsProps & {
  isLastIndex?: boolean;
  isSecondLastIndex?: boolean;
  isThirdLastIndex?: boolean;
  isLead?: boolean;
  isPayment?: boolean;
  isOffer?: boolean;
  isAdminCustomer?: boolean;
  isContract?: boolean;
  selectedItem?: String;
}) => {
  const handleItemClick = (item: string) => {
    onItemClick(item);
  };

  const containerDefaultClasses = `absolute  ${
    (isLead &&
      (isLastIndex || isSecondLastIndex || isThirdLastIndex) &&
      "!-top-[170px]") ||
    (isPayment &&
      (isLastIndex || isSecondLastIndex || isThirdLastIndex) &&
      "!-top-[130px]") ||
    (isOffer &&
      (isLastIndex || isSecondLastIndex || isThirdLastIndex) &&
      "!-top-[170px]") ||
    (isAdminCustomer && (isLastIndex || isSecondLastIndex) && "!-top-[85px]") ||
    (isContract && (isLastIndex || isSecondLastIndex) && "!-top-[130px]") ||
    ((isLastIndex || isSecondLastIndex) && "!-top-20")
  }  z-10 w-fit border border-borderColor bg-white shadow-[0px_3px_6px_#00000029] rounded-br-lg rounded-bl-lg max-h-52 overflow-y-auto`;

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
      {items?.map(({ item }, idx) => {
        const isSelected = selectedItem === item.label;
        return (
          <li
            key={idx}
            className={`text-gray hover:text-white font-medium hover:bg-borderColor cursor-pointer px-3 py-2 ${
              isSelected ? "text-primary" : ""
            }`}
            onClick={() => handleItemClick(`${item.value}` || "")}
          >
            {item.label}
          </li>
        );
      })}
    </motion.ul>
  );
};
