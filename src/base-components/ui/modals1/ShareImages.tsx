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
              <span className="flex items-center gap-[6px]">
                <Image src={copyIcon} alt="copyIcon" />
                <span className="text-[#393939] font-medium text-base">
                  https//www.buro.com/share-link
                </span>
              </span>

              <button className="text-[#fff] bg-[#4A13E7] rounded-lg px-4 py-[6px] font-medium text-base w-[110px]">
                Copy
              </button>
            </div>
          </div>
        </div>
      </BaseModal>
    </>
  );
};

export default ShareImages;
