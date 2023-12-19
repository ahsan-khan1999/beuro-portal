import { IBaseModalProps } from "@/types";
import { Backdrop } from "../backdrop/backdrop";
import { combineClasses } from "@/utils/utility";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/utils/hooks";

export const BaseModal = ({
  children,
  onClose,
  containerClassName,
}: IBaseModalProps) => {
  const defaultContainerClasses =
    "rounded-lg bg-white w-[964px] max-w-[964px] min-h-[615px] max-h-[615px] ";
  const containerClasses = combineClasses(
    defaultContainerClasses,
    containerClassName
  );

  const ref = useOutsideClick<HTMLDivElement>(onClose);

  return (
    <Backdrop onClose={onClose}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.3 }}
        className={`${containerClasses}`}>
        {children}
      </motion.div>
    </Backdrop>
  );
};
