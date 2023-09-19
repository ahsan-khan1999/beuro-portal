import Image from "next/image";
import { PasswordInputProps } from "@/types";
// import eyeOpen from "@/assets/eye-open.png";
// import eyeClose from '@/assets/eye-close.png';
import { useState } from "react";

export const PasswordField = ({
  id,
  type,
  value,
  name,
  register,
  placeholder,
  className,
}: PasswordInputProps) => {
    const [showPass, setShowPass] = useState<boolean>(false);
  const defaultClasses =
    "w-full border-2 border-lightGray rounded-lg h-12 pl-4 pr-12 py-3 focus:border-primary outline-none";
  return (
    <div className="relative flex items-center">
      <input
        id={id}
        type={showPass ? 'text' : type}
        defaultValue={value}
        {...register(name)}
        placeholder={placeholder}
        className={`${defaultClasses} ${className}`}
      />
      {/* <Image
        className="absolute right-[16px] cursor-pointer"
        src={showPass ? eyeOpen : eyeClose}
        alt="show password icon"
        width={24}
        height={24}
        onClick={() => setShowPass(!showPass)}
      /> */}
    </div>
  );
};
