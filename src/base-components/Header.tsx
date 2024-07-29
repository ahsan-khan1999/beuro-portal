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
import { FollowUpNotification } from "./ui/follow-up-notification";

const Header = () => {
  const { t: translate } = useTranslation();
  const { user } = useAppSelector((state) => state.auth);
  const { systemSettings } = useAppSelector((state) => state.settings);
  const { followUp } = useAppSelector((state) => state.followUp);
  const [todayCount, setTodayCount] = useState<number>(0);
  const [upcomingFollowUp, setUpcomingFollowUp] = useState<any>(null);
  const [showNotification, setShowNotification] = useState<boolean>(false);

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

    if (todayFollowUps?.length > 0) {
      setTodayCount(todayFollowUps?.length);
    }
  }, [followUp]);

  useEffect(() => {
    if (
      user &&
      user?.role !== "Admin" &&
      user?.role !== "Agent" &&
      !systemSettings
    ) {
      dispatch(readSystemSettings());
      dispatch(readFollowUp({ params: { filter: { status: "10" } } })).then(
        (response: any) => {
          setTodayCount(response?.payload?.totalCount);
        }
      );
    }
  }, [user]);

  useEffect(() => {
    const now = moment();
    const oneHourLater = moment(now).add(1, "hour");
    const today = moment().startOf("day");

    const upcoming = followUp?.find((item) => {
      const itemTime = moment(item.dateTime);
      return (
        itemTime.isSame(today, "day") && itemTime.isBetween(now, oneHourLater)
      );
    });

    setUpcomingFollowUp(upcoming || null);
  }, [followUp]);

  useEffect(() => {
    const followUpTime = upcomingFollowUp ? upcomingFollowUp.dateTime : null;
    const now = new Date();
    // const end = new Date("2024-07-10T13:27:30Z");
    const end = new Date(followUpTime);
    const difference = end.getTime() - now.getTime();

    if (difference >= 600000) {
      const timer = setTimeout(() => {
        setShowNotification(true);
      }, difference - 600000);

      return () => clearTimeout(timer);
    }
  }, [upcomingFollowUp]);

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
            className="pr-[50px] max-h-[50px] border-r-2 border-[#000000] border-opacity-10"
            height={50}
            width={150}
          />
        </div>
      )}
      <div className="flex items-center">
        <div className="flex items-center pr-8">
          {user?.role !== "Admin" && user?.role !== "Agent" && (
            <div className="relative menu mr-5">
              <NotificationIcon count={todayCount} />
              {showNotification && (
                <FollowUpNotification
                  followUp={upcomingFollowUp}
                  setIsTimeEnded={setShowNotification}
                />
              )}
              <FollowUpDropDown />
            </div>
          )}

          <LanguageSelector />
        </div>
        <div className="border-l-2 border-[#000000] border-opacity-10 flex items-center pl-8">
          <Image src={userIcon} alt="User Icon" className="mr-3" />
          <div>
            <span className="font-semibold tracking-[0.5px] text-[#0A0A0A] block">
              {user?.fullName}
            </span>
            <div className="flex justify-between space-x-2">
              <span className=" text-sm tracking-[0.4 px] text-[#8F8F8F] block">
                {translate(`admin_role.${user?.role}`)}
              </span>
              <span className="px-2 cursor-pointer" onClick={handleLogout}>
                <Image src={logoutImage} alt="logout" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
