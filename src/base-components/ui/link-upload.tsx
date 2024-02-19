import { useTranslation } from "next-i18next";
import { BaseButton } from "./button/base-button";
import Image from "next/image";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import { LinkUploadProps } from "@/types";
import { validateUrl } from "@/utils/utility";
import { useState } from "react";
import error from '@/assets/pngs/error.png';
import Link from "next/link";

export const LinkUpload = ({
  inputLink,
  onAddLink,
  enteredLinks,
  onLinkDelete,
  setEnteredLink,
}: LinkUploadProps) => {
  const { t: translate } = useTranslation();
  const [validation, setValidation] = useState({ isValid: true, message: '' });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredLink(event.target.value);
    setValidation(validateUrl(event.target.value, translate));
  };
  function test() {
    console.error("invalid url")
  }
  return (
    <div className="mt-[10px]">

      <div className="flex items-center gap-x-4 mb-[10px]">
        <form className="w-full" onSubmit={(e) => validation?.isValid && onAddLink(e) || test()}>
          <input
            type="text"
            value={inputLink}
            onChange={(e) => handleChange(e)}
            placeholder="https://buero-365.com/"
            className="p-4 border border-[#4B4B4B] rounded-lg w-full h-12 outline-none text-dark text-sm focus:border-primary"
            required
            pattern={'((http|https)\\:\\/\\/)?[a-zA-Z0-9\\.\\/\\?\\:@\\-_=#]+\\.([a-zA-Z]){2,6}([a-zA-Z0-9\\.\\&\\/\\?\\:@\\-_=#])*'}

          />

        </form>
        <BaseButton
          buttonText={translate("common.add")}
          containerClassName="rounded-lg px-4 min-w-fit h-[48px] bg-primary hover:bg-buttonHover"
          textClassName="text-white"
          onClick={validation?.isValid && onAddLink || test}

        />

      </div>
      {!validation?.isValid && <span className="text-red text-sm">{validation?.message}</span>}
      {
        enteredLinks?.map((link, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-b-[#000] border-opacity-10 pb-2 mt-2"
          >
            <Link href={link} target="_blank" className="text-[#0000EE] text-base font-normal underline truncate max-w-[500px]">
              {link}
            </Link>

            <div className="border-[#4A13E7] border w-10 h-10 rounded-lg flex items-center justify-center">
              <Image
                src={deleteIcon}
                alt="deleteIcon"
                className="cursor-pointer"
                width={16}
                height={20}
                onClick={() => onLinkDelete(index)}
              />
            </div>
          </div>
        ))
      }
    </div >
  );
};
