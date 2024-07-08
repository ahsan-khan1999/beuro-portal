import React, { useEffect, useMemo, useState } from "react";
import userIcon from "@/assets/svgs/Group 48095860.svg";
import Image from "next/image";
import FollowUpDropDown from "@/components/FollowUpDropDown";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import logoutImage from "@/assets/svgs/Group 41120.svg";
import { useRouter } from "next/router";
import { staticEnums } from "@/utils/static";
import logo from "@/assets/svgs/logo.svg";
import { logout } from "@/utils/auth.util";
import { useTranslation } from "next-i18next";
import { logoutUser } from "@/api/slices/authSlice/auth";
import { readSystemSettings } from "@/api/slices/settingSlice/settings";
import { LanguageSelector } from "@/base-components/languageSelector/language-selector";
import { NotificationIcon } from "@/assets/svgs/components/notification-icon";
import { readFollowUp } from "@/api/slices/followUp/followUp";
import moment from "moment";

const Header = () => {
  const { t: translate } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const { systemSettings } = useAppSelector((state) => state.settings);
  const { followUp } = useAppSelector((state) => state.followUp);
  const [todayCount, setTodayCount] = useState<number>(0);

  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleLogout = async () => {
    await dispatch(logoutUser());
    logout();
    router.push("/");
    // router.push({
    //   pathname: "/pdf",
    //   query: { offerID: "663b43cbfc6d974b9729e4f9", action: "Accept" },
    // });
  };

  useMemo(() => {
    const today = moment().startOf("day");
    const todayFollowUps = followUp?.filter((item) =>
      moment(item.dateTime).isSame(today, "day")
    );

    if (todayFollowUps.length > 0) {
      setTodayCount(todayFollowUps.length);
    }
  }, [followUp]);

  useEffect(() => {
    if (user && user?.role !== "Admin" && !systemSettings) {
      dispatch(readSystemSettings());
      dispatch(readFollowUp({ params: { filter: { status: "10" } } })).then(
        (response: any) => {
          setTodayCount(response?.payload?.totalCount);
        }
      );
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = moment();
      const upcomingFollowUps = followUp?.filter((item) =>
        moment(item.dateTime).isBetween(now, moment(now).add(1, "minute"))
      );

      if (upcomingFollowUps.length > 0) {
        showError("This follow-up is finishing within 1 minute");
      } 
    }, 3000); 

    return () => clearInterval(interval);
  }, [followUp]);

  const isSVG = user?.company?.logo?.endsWith(".svg");
  return (
    <div className="fixed w-full top-0 p-4 flex justify-between items-center shadow-header z-50 bg-white col">
      {(staticEnums["User"]["role"][user?.role as string] !== 0 && (
        <div className="flex items-center">
          {user?.company?.logo && (
            <>
              {isSVG ? (
                <object
                  data={user?.company?.logo}
                  width="150"
                  height="50"
                  type="image/svg+xml"
                  className="pr-[50px] max-h-[50px] border-r-2 border-[#000000] border-opacity-10"
                ></object>
              ) : (
                <Image
                  src={user?.company?.logo}
                  alt="Company Logo"
                  className="pr-[50px] max-h-[50px] border-r-2 border-[#000000] border-opacity-10"
                  height={50}
                  width={150}
                />
              )}
            </>
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
            <div className="relative menu mr-5">
              {/* <Image
                src={createOfferIcon}
                alt="Create Offer Icon"
                className="cursor-pointer"
              /> */}
              <NotificationIcon count={todayCount} />
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
                {translate(`admin_role.${user?.role}`)}
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
