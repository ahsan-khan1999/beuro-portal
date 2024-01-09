import Image from "next/image";
import React from "react";
import { BaseModal } from "@/base-components/ui/modals/base-modal";
import crossIcon from "@/assets/svgs/cross_icon.svg";
import whatsappIcon from "@/assets/svgs/whats_icon.svg";
import facebookIcon from "@/assets/svgs/facebook_icon.svg";
import instaIcon from "@/assets/svgs/inta_icon.svg";
import twitterIcon from "@/assets/svgs/twitter_icon.svg";
import messagesIcon from "@/assets/svgs/messages_icon.svg";
import telegramIcon from "@/assets/svgs/telegram_icon.svg";
import youtubeIcon from "@/assets/svgs/youtube_icon.svg";
import linkedIncon from "@/assets/svgs/linkedIn_icon.svg";
import gmailIncon from "@/assets/svgs/gmail_icon.svg";
import messengerIcon from "@/assets/svgs/messenger_icon.svg";
import copyIcon from "@/assets/svgs/copy_icon.svg";
import { BaseButton } from "../button/base-button";
import { useClipboardCopy } from "@/utils/utility";
import { CopyIcon } from "@/assets/svgs/components/copy-icon";
import { useRouter } from "next/router";
import { DOMAIN } from "@/services/HttpProvider";
import { useTranslation } from "next-i18next";

const ShareImages = ({ onClose }: { onClose: () => void }) => {
  const imgSource = [
    whatsappIcon,
    facebookIcon,
    instaIcon,
    twitterIcon,
    messagesIcon,
    telegramIcon,
    youtubeIcon,
    linkedIncon,
    gmailIncon,
    messengerIcon,
  ];
  const { handleCopy, inputRef, isCopied } = useClipboardCopy();
  const router = useRouter();

  const { t: translate } = useTranslation();

  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[480px] lg:max-w-[624.862px] min-h-fit "
      >
        <div className="relative flex flex-col lg:px-[39px] lg:pb-[40px] lg:pt-[24px] p-4">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <p className="text-[#000] font-medium text-2xl mb-5">
            {translate("offers.share_images_modal.heading")}
          </p>

          <hr className="opacity-25 mb-[23px]" />
          <div>
            <span className="text-[#393939] font-normal text-base">
              {translate("offers.share_images_modal.sub_heading")}
            </span>

            <div className="grid grid-cols-5 gap-y-6 gap-x-[25px] mt-5 mb-4">
              {imgSource.map((src, index) => (
                <div key={index} className="flex justify-center items-center">
                  <Image
                    src={src}
                    alt="source"
                    className="cursor-pointer w-full"
                  />
                </div>
              ))}
            </div>

            <span className="text-[#393939] font-normal text-base">
              {translate("offers.share_images_modal.link")}
            </span>

            <div className="flex justify-between items-center border border-[#BFBFBF] rounded-lg px-3 p-1 mt-5">
              <span className="flex items-center gap-[6px] w-full">
                <Image src={copyIcon} alt="copyIcon" />

                <input
                  id={"id"}
                  className={"text-[#393939] font-medium text-base w-full me-2"}
                  disabled={true}
                  value={DOMAIN + router.asPath}
                  ref={(e) => {
                    inputRef.current = e;
                  }}
                />
              </span>

              <BaseButton
                containerClassName={`flex gap-x-1 ${
                  !isCopied ? "bg-lighttest-gray" : "bg-primary"
                } py-1 px-2.5 rounded !!border !!border-lightGray`}
                textClassName={`${
                  !isCopied ? "text-primary" : "text-white"
                } font-medium`}
                buttonText={
                  !isCopied
                    ? translate("offers.share_images_modal.copy_button")
                    : translate("offers.share_images_modal.copied_button")
                }
                onClick={handleCopy}
              >
                {!isCopied && <CopyIcon />}
              </BaseButton>
            </div>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default ShareImages;
