import { CopyIcon } from "@/assets/svgs/components/copy-icon";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { SecurityTokenFieldProps } from "@/types";
import { useClipboardCopy } from "@/utils/hooks";
import { combineClasses } from "@/utils/utility";
import passwordIcon from "@/assets/svgs/password.svg";
import Image from "next/image";
import eyeOpenIcon from "@/assets/svgs/show_password_icon.svg";
import eyeCloseIcon from "@/assets/svgs/hide_password_icon.svg";
import { useState } from "react";
export const SecurityTokenField = ({
  value,
  placeholder,
  disabled,
  onChange,
}: SecurityTokenFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const { inputRef, handleCopy, isCopied } = useClipboardCopy();
  const defaultClasses = `border-2 border-lightGray rounded-lg h-12 w-full ${
    true ? "pl-4 pr-10" : "px-4"
  } py-3 focus:border-primary outline-none`;
  const classes = combineClasses(defaultClasses);
  return (
    <div className="relative w-full">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        className={classes}
        disabled={disabled}
        ref={(e) => {
          inputRef.current = e;
        }}
        onChange={(e) => onChange(e.target.value)}
        defaultValue={value}
      />

      <div className="absolute top-2/4 right-2.5 transform -translate-y-2/4 ">
        <div className="flex gap-3">
          <Image
            src={showPassword ? eyeOpenIcon : eyeCloseIcon}
            alt="eyeIcon"
            onClick={handleTogglePassword}
            className="cursor-pointer h-[20px] w-[20px] flex my-auto align-middle"
          />

          <BaseButton
            containerClassName={`flex gap-x-1 ${
              !isCopied ? "bg-lighttest-gray" : "bg-primary"
            } py-1 px-2.5 rounded !!border !!border-lightGray`}
            textClassName={`${
              !isCopied ? "text-primary" : "text-white"
            } font-medium`}
            buttonText={!isCopied ? "" : "Copied"}
            onClick={handleCopy}
          >
            {!isCopied && <CopyIcon />}
          </BaseButton>
        </div>
      </div>
    </div>
  );
};
