import React from "react";
import companyLogo from "@/assets/svgs/company-logo.svg";
import createOfferIcon from "@/assets/svgs/create-offer.svg";
import userIcon from "@/assets/svgs/Group 48095860.svg";
import { LanguageSelector } from "@/base-components/languageSelector/language-selector";
import Image from "next/image";
import FollowUpDropDown from "@/components/FollowUpDropDown";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { isJSON } from "@/utils/functions";
import { getUser, logout } from "@/utils/auth.util";
import logoutImage from "@/assets/svgs/Group 41120.svg"
import { useRouter } from "next/router";
import { updateQuery } from "@/utils/update-query";
import { logoutUser } from "@/api/slices/authSlice/auth";
import { staticEnums } from "@/utils/static";
import logo from "@/assets/svgs/logo.svg";

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch()
  const router = useRouter()
  const handleLogout = () => {
    dispatch(logoutUser())
    logout()
    // router.push({ pathname: "/pdf", query: { offerID: "65818637dcd677eea3fe1b9c" } })
  }
  return (
    <div className="fixed w-full top-0 p-4 flex justify-between items-center shadow-header z-50 bg-white col">
      {
        staticEnums["User"]["role"][user?.role as string] !== 0 &&

        <div className="flex items-center">
          <Image
            src={user?.company?.logo || ""}
            alt="Company Logo"
            className="pr-[50px] max-h-[50px] border-r-2 border-[#000000] border-opacity-10"
            height={50}
            width={150}
          />
          <span className="font-medium text-2xl tracking-[0.15px] text-dark pl-8">
            {user?.company?.companyName}{" "}
          </span>

        </div> ||

        <div className="flex items-center">
          <Image
            src={logo}
            alt="Company Logo"
            className="pr-[50px] max-h-[50px]  border-r-2 border-[#000000] border-opacity-10"
            height={50}
            width={150}
          />
        

        </div>
      }
      <div className="flex items-center">
        <div className="flex items-center pr-8">
          {
            staticEnums["User"]["role"][user?.role as string] !== 0 &&
            <div className="relative menu pl-7 mr-6">
              <Image src={createOfferIcon} alt="Create Offer Icon" className="cursor-pointer" />

              <FollowUpDropDown />
            </div>
          }
          <LanguageSelector />
        </div>
        <div className="border-l-2 border-[#000000] border-opacity-10 flex items-center pl-8">
          <Image src={userIcon} alt="User Icon" className="mr-3" />
          <div className="">
            <span className="font-semibold tracking-[0.5px] text-[#0A0A0A] block">
              {user?.fullName}
            </span>
            <span className="flex justify-between space-x-2">
              <span className=" text-sm tracking-[0.4 px] text-[#8F8F8F] block">

                {user?.role}
              </span>
              <span className=" px-2  cursor-pointer " onClick={handleLogout}>

                <Image src={logoutImage} alt="logout" />
              </span>
            </span>


          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
