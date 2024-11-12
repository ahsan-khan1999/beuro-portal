import { IconProps } from "@/types";
import { combineClasses } from "@/utils/utility";

export const IconFeild = ({
  id,
  containerClassName,
  icon,
  text,
  textClassName,
  onClick,
}: IconProps) => {
  const defaultClasses = combineClasses(
    `flex items-center gap-x-1 cursor-pointer`,
    containerClassName
  );

  const textClasses = combineClasses(
    "text-sm font-medium text-[#272727]",
    textClassName
  );

  return (
    <div className={defaultClasses} id={id} onClick={onClick}>
      <span dangerouslySetInnerHTML={{ __html: icon }} />
      <span className={textClasses}>{text}</span>
    </div>
  );
};
