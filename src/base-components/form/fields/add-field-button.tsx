import { AddFieldProps, ButtonProps } from "@/types";
import { combineClasses } from "@/utils/utility";


import Image from "next/image";
export const AddFiled = ({
  text,
  className,
  onClick,
  icon,
  iconAlt,
}: AddFieldProps) => {
  return (
    <span
      onClick={() => {
        onClick && onClick();
      }}
      className={`${className} bg-purple-500`}
    >
      <Image src={icon} alt={iconAlt} className="cursor-pointer"/>
      <span>{text}</span>
    </span>
  );
};
