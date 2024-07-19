import { ButtonProps } from "@/types";
import Loader from "../loader/loader";
import { combineClasses } from "@/utils/utility";
import Image from "next/image";

export const OutlineButton = ({
  inputType,
  text,
  className,
  loading,
  success,
  onClick,
  loaderColor,
  icon,
  iconAlt,
  disabled,
  id,
}: ButtonProps) => {
  const defaultClasses = `!h-10 min-w-fit px-3 py-2 !h-[33px] bg-primary border border-lightGray text-dark text-sm font-semibold hover:bg-buttonHover rounded-lg`;
  const classes = combineClasses(defaultClasses, className);

  return loading ? (
    <button
      id={id}
      type={inputType}
      disabled={loading && disabled}
      className={`${classes} flex justify-center`}
    >
      <Loader
        height="50"
        width="50"
        radius="9"
        color={(loaderColor && loaderColor) || "#fff"}
      />
    </button>
  ) : (
    <button
      id={id}
      type={inputType}
      className={`hover:bg-buttonHover hover:text-white ${
        success && "flex items-center gap-x-2"
      } flex items-center justify-center ${classes}`}
      onClick={() => {
        onClick && onClick();
      }}
      disabled={disabled || false}
    >
      {icon && <Image src={icon} alt={iconAlt} className="mr-1 " />}{" "}
      {success ? "Geändert" : text}
    </button>
  );
};
