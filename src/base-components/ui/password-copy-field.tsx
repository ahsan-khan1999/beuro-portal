import Image from "next/image";
import React, { MutableRefObject, useState } from "react";
import passwordIcon from "@/assets/svgs/password.svg";
import eyeOpenIcon from "@/assets/svgs/show_password_icon.svg";
import eyeCloseIcon from "@/assets/svgs/hide_password_icon.svg";
import copyInputIcon from "@/assets/svgs/copy_input_icon.svg";
import { useClipboardCopy } from "@/utils/hooks";
import InputField from "../filter/fields/input-field";

const PasswordCopyField = ({ password }: { password: MutableRefObject<string> }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { inputRef, handleCopy, isCopied } = useClipboardCopy();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="border border-[#BFBFBF] rounded-md px-4 py-3 flex justify-between items-center">
      <div className="flex gap-[14px] items-baseline">
        <Image src={passwordIcon} alt="passwordIcon" />
        <InputField
          containerClassName="w-full"
          textClassName="w-full"
          handleChange={(value) => {
            password.current = value
          }}
          value={password.current}
        />
        {/* <span className="text-[#484848] font-normal text-[14px]">
          {showPassword ? password.current : "***********"}
        </span> */}
      </div>
      <div className="flex gap-3">
        <Image
          src={showPassword ? eyeOpenIcon : eyeCloseIcon}
          alt="eyeIcon"
          onClick={handleTogglePassword}
          className="cursor-pointer"
        />
        <div ref={inputRef} style={{ display: "none" }}>
          {password.current}
        </div>
        <Image
          src={isCopied ? copyInputIcon : copyInputIcon}
          alt="copyInputIcon"
          onClick={handleCopy}
          className={`cursor-pointer ${isCopied ? "text-[#00C82D]" : ""}`}
        />
      </div>
    </div>
  );
};

export default PasswordCopyField;
