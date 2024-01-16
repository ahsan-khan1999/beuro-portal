import React, { useEffect } from "react";
import createOfferIcon from "@/assets/svgs/create-offer.svg";
import userIcon from "@/assets/svgs/Group 48095860.svg";
import { LanguageSelector } from "@/base-components/languageSelector/language-selector";
import Image from "next/image";
import FollowUpDropDown from "@/components/FollowUpDropDown";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import logoutImage from "@/assets/svgs/Group 41120.svg";
import { useRouter } from "next/router";
import { staticEnums } from "@/utils/static";
import logo from "@/assets/svgs/logo.svg";
import { getUser, logout } from "@/utils/auth.util";
import { logoutUser } from "@/api/slices/authSlice/auth";
import { readSystemSettings } from "@/api/slices/settingSlice/settings";
import localStoreUtil from "@/utils/localstore.util";
import { isJSON } from "@/utils/functions";
import { User } from "@/types";

const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { systemSettings } = useAppSelector((state) => state.settings);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = () => {
    dispatch(logoutUser());
    logout();
    // router.push({ pathname: "/pdf", query: { offerID: "65a523c960fb493125ebd88f", action: "Accept" } })
  };
  useEffect(() => {
    if (user && user?.role !== "Admin" && !systemSettings) {
      dispatch(readSystemSettings());
    }
  }, [user]);

  return (
    <div className="fixed w-full top-0 p-4 flex justify-between items-center shadow-header z-50 bg-white col">
      {(staticEnums["User"]["role"][user?.role as string] !== 0 && (
        <div className="flex items-center">
          {user?.company?.logo && (
            <Image
              src={user?.company?.logo}
              alt="Company Logo"
              className="pr-[50px] max-h-[50px] border-r-2 border-[#000000] border-opacity-10"
              height={50}
              width={150}
            />
          )}

          <span className="font-medium text-2xl tracking-[0.15px] text-dark pl-8">
            {user?.company?.companyName}{" "}
          </span>
        </div>
      )) || (
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Company Logo"
            className="pr-[50px] max-h-[50px]  border-r-2 border-[#000000] border-opacity-10"
            height={50}
            width={150}
          />
        </div>
      )}
      <div className="flex items-center">
        <div className="flex items-center pr-8">
          {user?.role !== "Admin" && (
            <div className="relative menu mr-6">
              <Image
                src={createOfferIcon}
                alt="Create Offer Icon"
                className="cursor-pointer"
              />
              <FollowUpDropDown />
            </div>
          )}

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
              <span className="px-2 cursor-pointer" onClick={handleLogout}>
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
