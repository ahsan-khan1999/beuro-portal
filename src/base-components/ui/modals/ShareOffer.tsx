import React from "react";
import { InfoModal } from "./info-modal";
import facebook from "@/assets/svgs/components/facebook-popup.svg";
import instagram from "@/assets/svgs/components/instagram-popup.svg";
import twitter from "@/assets/svgs/components/twitter-popup.svg";
import pinterest from "@/assets/svgs/components/pinterest-popup.svg";
import email from "@/assets/svgs/components/email-popup.svg";
import Image from "next/image";
import Link from "next/link";

const ShareOffer = ({ onClose }: { onClose: () => void }) => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: facebook,
      alt: "Facebook Icon",
    },
    {
      name: "Instagram",
      icon: instagram,
      alt: "Instagram Icon",
    },
    {
      name: "Twitter",
      icon: twitter,
      alt: "Twitter Icon",
    },
    {
      name: "Pinterest",
      icon: pinterest,
      alt: "Pinterest Icon",
    },
    {
      name: "Email",
      icon: email,
      alt: "Email Icon",
    },
  ];
  return (
    <InfoModal
      onClose={onClose}
      modalTitle="Teile diesen Artikel"
      containerClassName="max-w-[572px] min-h-fit"
    >
      <div className="flex justify-between items-center pt-8">
        {socialLinks.map((item) => {
          return (
            <Link href={""}>
              <Image src={item.icon} alt={item.alt} className="mx-auto" />
              <h2 className="font-medium text-sm text-[#616161] mt-[10px] text-center">
                {item.name}
              </h2>
            </Link>
          );
        })}
      </div>
      <form className="pt-8">
        <label className="font-medium text-dark ">Link Kopieren</label>
        <div className="border border-[#BFBFBFB5] rounded-lg relative pl-4 pr-1 py-1 flex items-center mt-[10px]">
          <input
            className="pr-4 w-full focus:outline-none text-gray"
            type="text"
          />
          <button className="bg-secondary rounded-lg py-2 px-4 text-white text-sm font-medium  ">
            Kopieren
          </button>
        </div>
      </form>
    </InfoModal>
  );
};

export default ShareOffer;
