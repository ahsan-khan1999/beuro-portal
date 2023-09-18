import Link from "next/link";
import React from "react";
import twitterIcon from "@/assets/svgs/twitter.svg";
import facebookIcon from "@/assets/svgs/facebook.svg";
import instagramIcon from "@/assets/svgs/instagram.svg";
import pinterestIcon from "@/assets/svgs/pinterest.svg";
import Image from "next/image";
import logo from "@/assets/logo.png";

const HelpCenterFooter = () => {
  return (
    <>
      <div className="help-center-container flex justify-between py-[26px]">
        <Image src={logo} alt="brand logo" width={167} height={48} />
        <div className="flex items-center lg:space-x-[50px] space-x-4">
          <Link href={""} className="font-medium text-[#272727]">
            Help
          </Link>
          <Link href={""} className="font-medium text-[#272727]">
            Advertisements
          </Link>
          <Link href={""} className="font-medium text-[#272727]">
            Privacy Policy
          </Link>
          <Link href={""} className="font-medium text-[#272727]">
            Contact Us
          </Link>
        </div>
        <div className="flex items-center lg:space-x-5 space-x-2">
          <Link href={""}>
            <Image src={twitterIcon} alt="Twitter Icon" />
          </Link>
          <Link href={""}>
            <Image src={facebookIcon} alt="Facebook Icon" />
          </Link>
          <Link href={""}>
            <Image src={instagramIcon} alt="Instagram Icon" />
          </Link>
          <Link href={""}>
            <Image src={pinterestIcon} alt="Pinterest Icon" />
          </Link>
        </div>
      </div>
      <p className="  flex items-center justify-center h-5 bg-secondary text-xs text-white">
        © 2023 Kaufes. All Rights Reserved
      </p>
    </>
  );
};

export default HelpCenterFooter;
