import { BaseButtonProps } from "@/types";
import { combineClasses } from "@/utils/utility";

export const BaseButton = ({
  children,
  buttonText,
  containerClassName,
  textClassName,
  onClick,
  disabled = false,
}: BaseButtonProps) => {
  const defaultClasses =
    "bg-white border border-lightGray py-2 px-3 rounded-lg";
  const defaultTextClassName = "font-medium text-dark";

  const containerClasses = combineClasses(defaultClasses, containerClassName);
  const textClasses = combineClasses(defaultTextClassName, textClassName);
  return (
    <button className={`${containerClasses}`} onClick={onClick} disabled={disabled}>
      {children}
      <span className={`${textClasses}`}>{buttonText}</span>
    </button>
  );
};
