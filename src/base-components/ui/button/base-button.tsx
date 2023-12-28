import { BaseButtonProps } from "@/types";
import { combineClasses } from "@/utils/utility";
import Loader from "../loader/loader";

export const BaseButton = ({
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
    "bg-white hover:bg-buttonHover border border-lightGray py-2 px-3 rounded-lg";
  const defaultTextClassName = "font-medium text-dark";

  const containerClasses = combineClasses(defaultClasses, containerClassName);
  const textClasses = combineClasses(defaultTextClassName, textClassName);
  return (
    <button
      className={`${containerClasses}`}
      onClick={onClick}
      disabled={disabled}
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
