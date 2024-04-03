import { TableCardLayoutProps } from "@/types";
import { combineClasses } from "@/utils/utility";

export const TableCardLayout = ({
  children,
  containerClassName,
}: TableCardLayoutProps) => {
  const classes = combineClasses(
    "border border-[#E7E7E7] rounded-lg bg-white p-4 shadow-tableRow",
    containerClassName
  );
  return <div className={classes}>{children}</div>;
};
