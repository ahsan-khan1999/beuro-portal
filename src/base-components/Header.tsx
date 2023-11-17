import React from "react";
import companyLogo from "@/assets/svgs/company-logo.svg";
import createOfferIcon from "@/assets/svgs/create-offer.svg";
import userIcon from "@/assets/svgs/user.svg";
import { LanguageSelector } from "@/base-components/languageSelector/language-selector";
import Image from "next/image";
import FollowUpDropDown from "@/components/FollowUpDropDown";
import { useAppSelector } from "@/hooks/useRedux";
import { isJSON } from "@/utils/functions";
import { getUser } from "@/utils/auth.util";
const Header = () => {
  // const user = isJSON(getUser())
  const { user } = useAppSelector(state => state.auth)
  return (
    <div className="fixed w-full top-0 p-4 flex justify-between items-center shadow-header z-50 bg-white">
      <div className="flex items-center">
        <Image
          src={companyLogo}
          alt="Company Logo"
          className="pr-[50px] border-r-2 border-[#000000] border-opacity-10"
        />
        <span className="font-medium text-2xl tracking-[0.15px] text-dark pl-8">
          Umzugsfuchs{" "}
        </span>
      </div>
      <div className="flex items-center">
        <div className="flex items-center pr-8">
          <div className="relative menu pl-7 mr-6" >
            <Image src={createOfferIcon} alt="Create Offer Icon" />
            <FollowUpDropDown />
          </div>
          <LanguageSelector />
        </div>
        <div className="border-l-2 border-[#000000] border-opacity-10 flex items-center pl-8">
          <Image src={userIcon} alt="User Icon" className="mr-3" />
          <div className="">
            <span className="font-semibold tracking-[0.5px] text-[#0A0A0A] block">
              {user?.fullName}
            </span>
            <span className="text-sm tracking-[0.4 px] text-[#8F8F8F] block">
              {user?.role}

            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
