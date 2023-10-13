import { IBaseModalProps } from "@/types";
import { Backdrop } from "../backdrop/backdrop";
import { combineClasses } from "@/utils/utility";

export const BaseModal = ({
  children,
  onClose,
  containerClassName,
}: IBaseModalProps) => {
  const defaultContainerClasses =
    "rounded-lg bg-white w-[964px] max-w-[964px] min-h-[615px] max-h-[615px]";
  const containerClasses = combineClasses(
    defaultContainerClasses,
    containerClassName
  );
  return (
    <Backdrop onClose={onClose}>
      <div className={`${containerClasses}`}>{children}</div>
    </Backdrop>
  );
};
