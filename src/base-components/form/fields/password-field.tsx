import Image from "next/image";
import { PasswordInputProps } from "@/types";
import eyeOpen from "@/assets/pngs/eye-open.png";
import eyeClose from "@/assets/pngs/eye-close.png";
import { useState } from "react";
import passwordIcon from "@/assets/svgs/password.svg";

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
  const defaultClasses = `w-full border border-borderColor rounded-lg h-12  py-3 focus:border-primary outline-none ${
    name == "password" ? "pl-10 pr-4" : "px-4"
  }`;
  return (
    <div className="relative flex items-center">
      {name == "password" && (
        <Image
          src={passwordIcon}
          alt="Password Icon"
          className="absolute top-[17px] left-4"
        />
      )}
      <input
        id={id}
        type={showPass ? "text" : type}
        defaultValue={value}
        {...register(name)}
        placeholder={placeholder}
        className={`${defaultClasses} ${className}`}
      />
      <Image
        className="absolute right-[16px] cursor-pointer"
        src={showPass ? eyeOpen : eyeClose}
        alt="show password icon"
        width={24}
        height={24}
        onClick={() => setShowPass(!showPass)}
      />
    </div>
  );
};
