import { ButtonProps } from "@/types";
import Loader from "../loader/loader";
import { combineClasses } from "@/utils/utility";
// import { ButtonSuccessIcon } from "@/assets/svgs/components/button-success-icon";
import Image from "next/image";
import { useRouter } from "next/router";
export const Button = ({
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
  id
}: ButtonProps) => {

  const router = useRouter()

  const defaultClasses =
    `min-w-fit px-4 bg-primary hover:bg-buttonHover  text-white !h-[50px] font-medium rounded-lg`;
  const classes = combineClasses(defaultClasses, className);
  return loading ? (
    <button
      id={id}
      type={inputType}
      disabled={loading && disabled}
      className={`${classes}   flex justify-center`}
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
      className={` hover:bg-buttonHover hover:text-white text-dark  ${success && "flex items-center gap-x-2  "
        } flex items-center justify-center ${classes}`}
      onClick={() => {
        onClick && onClick();
      }}
      disabled={disabled || false}

    >
      {icon && <Image src={icon} alt={iconAlt} className="mr-1 " />}{" "}
      {success ? "Geändert" : text}
      {/* {success && <ButtonSuccessIcon />} */}
    </button>
  );
};
