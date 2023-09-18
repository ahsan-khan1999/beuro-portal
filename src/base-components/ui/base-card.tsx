import { BaseCardProps } from "@/types";
import { combineClasses } from "@/utils/utility";

export const BaseCard: React.FC<BaseCardProps> = ({ children, containerClassName }) => {
  const defaultClasses = "bg-white rounded-lg p-5";
  const classes = combineClasses(defaultClasses, containerClassName);

  return <div className={`${classes}`}>{children}</div>;
};
