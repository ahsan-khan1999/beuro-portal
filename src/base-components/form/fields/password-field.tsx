import Image from "next/image";
import { PasswordInputProps } from "@/types";
import eyeOpen from "@/assets/pngs/eye-open.png";
import eyeClose from "@/assets/pngs/eye-close.png";
import { useState } from "react";
import { useRouter } from "next/router";

export const PasswordField = ({
  id,
  type,
  value,
  name,
  register,
  placeholder,
  className,
  svg,
  alt,
}: PasswordInputProps) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [inputFocus, setInputFocus] = useState(false);
  const router = useRouter();

  const defaultClasses = `w-full border border-borderColor rounded-lg   py-[10px] text-sm focus:border-primary outline-none ${
    type == "password" ? "pl-10 pr-4" : "px-4"
  }`;
  return (
    <div className="relative flex items-center">
      {/* {type == "password" && (
        <Image
          src={passwordIcon}
          alt="Password Icon"
          className="absolute top-[14px] left-4"
        />
      )} */}
      {router.pathname === "/setting" && (
        <button className="absolute right-3  z-50 bg-[#4A13E7] text-white rounded-lg px-5 py-1">Change</button>
      )}
      <span
        className={`mr-3 absolute top-4 left-4 ${
          (inputFocus && "tests") || "test"
        }`}
        dangerouslySetInnerHTML={{ __html: svg }}
      />

      <input
        onFocus={() => setInputFocus(true)}
        // onBlur={() => setInputFocus(false)}
        onBlurCapture={() => setInputFocus(false)}
        id={id}
        type={showPass ? "text" : type}
        defaultValue={value}
        {...register(name)}
        placeholder={placeholder}
        className={`${defaultClasses} ${className}`}
      />

      {router.pathname !== "/setting" && (
        <Image
          className={`absolute right-[16px] cursor-pointer ${
            (inputFocus && "tests") || "test"
          }`}
          src={showPass ? eyeOpen : eyeClose}
          alt={alt}
          width={20}
          height={20}
          onClick={() => setShowPass(!showPass)}
        />
      )}
    </div>
  );
};
