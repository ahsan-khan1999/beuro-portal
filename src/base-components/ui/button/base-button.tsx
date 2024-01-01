import { BaseButtonProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import Loader from "../loader/loader";

export const BaseButton = ({
  id,
  children,
  buttonText,
  containerClassName,
  textClassName,
  onClick,
  disabled = false,
  loading,
  loaderColor,
}: BaseButtonProps) => {
  const defaultClasses =
    "bg-white border border-lightGray py-2 px-3 rounded-lg";
  const defaultTextClassName = "font-medium text-dark";

  const containerClasses = combineClasses(defaultClasses, containerClassName);
  const textClasses = combineClasses(defaultTextClassName, textClassName);
  return (
    <button
      className={`${containerClasses}`}
      onClick={onClick}
      disabled={disabled}
      id={id}
    >
      {loading ? (
        <Loader
          height="24"
          width="126"
          radius="9"
          color={(loaderColor && loaderColor) || "#fff"}
        />
      ) : (
        <>
          {children}
          <span className={`${textClasses}`}>{buttonText}</span>
        </>
      )}
    </button>
  );
};
