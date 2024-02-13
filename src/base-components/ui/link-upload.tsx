import { useTranslation } from "next-i18next";
import { BaseButton } from "./button/base-button";
import Image from "next/image";
import deleteIcon from "@/assets/pngs/delet-icon.png";
import { LinkUploadProps } from "@/types";

export const LinkUpload = ({
  inputLink,
  onAddLink,
  enteredLinks,
  onLinkDelete,
  setEnteredLink,
}: LinkUploadProps) => {
  const { t: translate } = useTranslation();

  return (
    <div className="mt-[38px]">
      <p className="text-[#393939] text-base font-medium mb-[19px]">
        {translate("common.upload_link")}
      </p>
      <div className="flex items-center gap-x-4 mb-[27px]">
        <input
          type="text"
          value={inputLink}
          onChange={(e) => setEnteredLink(e.target.value)}
          placeholder="e.g https://buero-365.com/"
          className="p-4 border border-[#4B4B4B] rounded-lg w-full h-12 outline-none text-dark text-sm focus:border-primary"
        />
        <BaseButton
          buttonText={translate("common.add")}
          containerClassName="rounded-lg px-4 min-w-fit h-[48px] bg-primary hover:bg-buttonHover"
          textClassName="text-white"
          onClick={onAddLink}
        />
      </div>
      {enteredLinks.map((link, index) => (
        <div
          key={index}
          className="flex justify-between items-center border-b border-b-[#000] border-opacity-10 pb-2 mt-2"
        >
          <p className="text-base font-normal text-black truncate max-w-[500px]">
            {link}
          </p>
          <div className="border-[#4A13E7] border w-10 h-10 rounded-lg flex items-center justify-center">
            <Image
              src={deleteIcon}
              alt="deleteIcon"
              className="cursor-pointer"
              width={16}
              height={20}
              onClick={() => onLinkDelete(link)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
