import { IconLabelProps } from "@/types";
import { combineClasses } from "@/utils/utility";

export const IconLabelFeild = ({
  id,
  containerClassName,
  icon,
  iconClassName,
  text,
  textClassName,
}: IconLabelProps) => {
  const defaultClasses = combineClasses(
    "flex items-center gap-x-1",
    containerClassName
  );

  const textClasses = combineClasses(
    "text-sm font-medium text-[#272727]",
    textClassName
  );

  return (
    <div className={defaultClasses} id={id}>
      <span dangerouslySetInnerHTML={{ __html: icon }} />
      <span className={textClasses}>{text}</span>
    </div>
  );
};
