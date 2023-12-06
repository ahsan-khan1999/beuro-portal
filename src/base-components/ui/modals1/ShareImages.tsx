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
  const { handleCopy, inputRef, isCopied } = useClipboardCopy()
  const router = useRouter()
  return (
    <>
      <BaseModal
        onClose={onClose}
        containerClassName="max-w-[624px] min-h-auto max-h-[465px]"
      >
        <div className="relative flex flex-col px-[39px] pb-[40px] pt-[24px]">
          <Image
            src={crossIcon}
            alt="cross_icon"
            className="absolute right-5 top-5 cursor-pointer"
            onClick={onClose}
          />
          <p className="text-[#000] font-medium text-[24px] leading-7 mb-5">
            Share Image
          </p>

          <hr className="opacity-25 mb-[23px]" />
          <div>
            <span className="text-[#393939] font-normal text-base">
              Share images on
            </span>

            <div className="flex justify-between gap-[25px] flex-wrap my-5">
              {imgSource.map((src, index) => (
                <div key={index}>
                  <Image src={src} alt={src} className="cursor-pointer" />
                </div>
              ))}
            </div>

            <span className="text-[#393939] font-normal text-base">
              Or copy link
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
                containerClassName={`flex gap-x-1 ${!isCopied ? "bg-lighttest-gray" : "bg-primary"
                  } py-1 px-2.5 rounded !!border !!border-lightGray`}
                textClassName={`${!isCopied ? "text-primary" : "text-white"
                  } font-medium`}
                buttonText={!isCopied ? "Copy" : "Copied"}
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
