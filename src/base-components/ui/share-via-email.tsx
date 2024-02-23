import { useTranslation } from "next-i18next";
import { BaseButton } from "./button/base-button";
import { ShareImagesViaEmail } from "@/types";
import { validateEmail } from "@/utils/utility";
import { useState } from "react";

export const ShareImagesOnEmail = ({
  inputEmail,
  setEnteredEmail,
  onSend,
}: ShareImagesViaEmail) => {
  const { t: translate } = useTranslation();
  const [validation, setValidation] = useState({ isValid: true, message: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredEmail(event.target.value);
    setValidation(validateEmail(event.target.value, translate));
  };

  function test() {
    console.error("invalid email");
  }

  return (
    <div className="mt-[10px]">
      <div className="flex items-center gap-x-4 mb-[10px]">
        <form
          className="w-full"
          onSubmit={(e) => (validation?.isValid && onSend(e)) || test()}
        >
          <input
            type="email"
            value={inputEmail}
            onChange={(e) => handleChange(e)}
            placeholder="example@gmail.com"
            className="p-4 border border-[#4B4B4B] rounded-lg w-full h-12 outline-none text-dark text-sm focus:border-primary"
            required
          />
        </form>
        <BaseButton
          buttonText={translate("common.share")}
          containerClassName="rounded-lg px-4 min-w-fit h-[48px] bg-primary hover:bg-buttonHover"
          textClassName="text-white"
          onClick={(validation?.isValid && onSend) || test}
        />
      </div>
    </div>
  );
};
