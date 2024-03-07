import { useTranslation } from "next-i18next";
import { BaseButton } from "./button/base-button";
import { ShareImagesViaWhatsapp } from "@/types";
import { validateNumber } from "@/utils/utility";
import { useState } from "react";

export const ShareImagesOnWhatsapp = ({
  inputNumber,
  onSend,
  setEnteredNumber,
}: ShareImagesViaWhatsapp) => {
  const { t: translate } = useTranslation();
  const [validation, setValidation] = useState({ isValid: true, message: "" });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredNumber(event.target.value);
    setValidation(validateNumber(event.target.value, translate));
  };

  function test() {
    console.error("invalid number");
  }

  return (
    <div className="mt-[10px]">
      <div className="flex items-center gap-x-4 mb-[10px]">
        <form
          className="w-full"
          onSubmit={(e) => (validation?.isValid && onSend(e)) || test()}
        >
          <input
            type="number"
            value={inputNumber}
            onChange={(e) => handleChange(e)}
            placeholder="0030 11 321 23 33"
            className="p-4 border border-[#4B4B4B] rounded-lg w-full h-12 outline-none text-dark text-sm focus:border-primary"
            required
            pattern={"/^+41d{9}$/"}
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
