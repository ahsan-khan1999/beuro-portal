import logo from "@/assets/svgs/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { CustomersIcon } from "@/assets/svgs/components/sideBar/Customers";
import { DashboardIcon } from "@/assets/svgs/components/sideBar/Dashboard";
import { LeadsIcon } from "@/assets/svgs/components/sideBar/Leads";
import { OffersIcon } from "@/assets/svgs/components/sideBar/Offers";
import { ContractsIcon } from "@/assets/svgs/components/sideBar/Contracts";
import { InvoicesIcon } from "@/assets/svgs/components/sideBar/Invoices";
import { ServicesIcon } from "@/assets/svgs/components/sideBar/Services";
import { EmployeesIcon } from "@/assets/svgs/components/sideBar/Employees";
import { ContentIcon } from "@/assets/svgs/components/sideBar/Content";
import { MailTrackerIcon } from "@/assets/svgs/components/sideBar/MailTracker";
import { SettingsIcon } from "@/assets/svgs/components/sideBar/Settings";
import { ContactSupportsIcon } from "@/assets/svgs/components/sideBar/ContactSupports";
import React, { useEffect, useState } from "react";
import { sideBar, staticEnums } from "@/utils/static";
import { PlanIcon } from "@/assets/svgs/components/sideBar/plan";
import { PaymentIcon } from "@/assets/svgs/components/sideBar/payment";
import { SupportRequestIcon } from "@/assets/svgs/components/sideBar/supportRequest";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { AppointmentsIcon } from "@/assets/svgs/components/sideBar/Appointments";
import { CrossIcon } from "@/assets/svgs/components/cross-icon";
import { LogoutIcon } from "@/assets/svgs/components/logout-icon";
import { logoutUser } from "@/api/slices/authSlice/auth";
import { logout } from "@/utils/auth.util";
import { LanguageSelector } from "./languageSelector/language-selector";
import { CalenderIcon } from "@/assets/svgs/components/sideBar/Calender-icon";
import { getCurrentUtcDate } from "@/utils/utility";

export const svgs = {
  Dashboard: <DashboardIcon />,
  Calendar: <CalenderIcon />,
  Customers: <CustomersIcon />,
  Leads: <LeadsIcon />,
  Appointments: <AppointmentsIcon />,
  Offers: <OffersIcon />,
  Contracts: <ContractsIcon />,
  Invoices: <InvoicesIcon />,
  Services: <ServicesIcon />,
  Employees: <EmployeesIcon />,
  Content: <ContentIcon />,
  MailTracker: <MailTrackerIcon />,
  Settings: <SettingsIcon />,
  ContactSupports: <ContactSupportsIcon />,
  plans: <PlanIcon />,
  payment: <PaymentIcon />,
  SupportRequest: <SupportRequestIcon />,
  setting: <SettingsIcon />,
  dummy: <></>,
};

const SideBar = ({
  isDrawer,
  handleDrawer,
}: {
  isDrawer: boolean;
  handleDrawer: (e: any) => void;
}) => {
  const { user } = useAppSelector((state) => state.auth);
  const { t: translation } = useTranslation();
  const dispatch = useAppDispatch();

  const [selected, setSelected] = useState<{
    parent: { title: string; isActive: boolean };
    child: any[] | null;
  }>({
    parent: {
      isActive: false,
      title: "Dashboard",
    },
    child: null,
  });

  const userRole = staticEnums["User"]["role"][user?.role as string];

  const router = useRouter();
  const routeChangeHandler = (item: any) => {
    let SUB_MENU: any[] | null = null;

    if (item.inner) {
      SUB_MENU = [];
    }

    setSelected((prev) => ({
      parent: {
        title: item.title,
        isActive:
          prev.parent.title === item.title ? !prev.parent.isActive : true,
      },
      child: SUB_MENU,
    }));
  };

  const filterHandler = (query: any) => {
    setSelected({
      ...selected,
      child: query,
    });
  };

  useEffect(() => {
    const currentItem = sideBar.find((item) => {
      return (
        item.pathname &&
        typeof item.pathname === "string" &&
        router.pathname.startsWith(item.pathname)
      );
    });

    if (currentItem) {
      setSelected((prev) => ({
        parent: {
          title: currentItem.title,
          isActive: true,
        },
        child: currentItem.inner || null,
      }));
    }
  }, [router.pathname]);

  const path = router.asPath;
  const isAgentRoute = path.startsWith("/");

  const handleLogout = async () => {
    await dispatch(logoutUser());
    logout();
    router.push("/");
  };

  return (
    <div
      className={`fixed left-0 w-[247px] bg-white rounded-r-[6px] h-full xl:top-[92px] overflow-scroll`}
    >
      {isAgentRoute && (
        <div className="absolute top-2 right-2 xMini:block xl:hidden">
          <CrossIcon onClick={handleDrawer} />
        </div>
      )}

      <div
        className={`${
          isAgentRoute ? "pt-10 xl:pt-6" : "pt-6"
        } px-4 pb-8 flex flex-col`}
      >
        <div className="space-y-3">
          {sideBar?.map((item) => {
            if (item.title.toLowerCase().includes("appointments")) {
              if (userRole === 1) {
                if (!user?.company?.isAppointment) {
                  return null;
                }
              }
            }

            return (
              item.role.includes(userRole) && (
                <React.Fragment key={item?.pathname}>
                  <Link
                    href={{
                      pathname: item.pathname,
                      query:
                        item.icon === "Leads" || item.icon === "Appointments"
                          ? {
                              [String(item.queryName)]: item.query,
                              today: getCurrentUtcDate(),
                            }
                          : item.query
                          ? {
                              [String(item.queryName)]: item.query,
                            }
                          : {},
                    }}
                    onClick={() => routeChangeHandler(item)}
                    className={`hover:bg-[#E9E1FF] rounded-lg flex justify-between items-center px-3 py-2 w-full break-all ${
                      selected.parent.title === item.title &&
                      "bg-primary rounded-lg hover:bg-primary"
                    }`}
                  >
                    <div className="flex items-center">
                      <span
                        className={`${
                          selected.parent.title === item.title && "sidebar-svg"
                        } mr-2`}
                      >
                        {item.icon && svgs[item.icon]}
                      </span>
                      <span
                        className={`text-base font-semibold tracking-[0.5px] text-[#4B4B4B] ${
                          selected.parent.title === item.title && "text-white"
                        }`}
                      >
                        {translation(item.title)}
                      </span>
                    </div>
                    {item.inner && (
                      <div
                        className={`
                              cursor-pointer 
                              ${
                                selected.parent.title === item.title &&
                                selected.parent.isActive &&
                                selected.child &&
                                "rotate-180"
                              }
                              ${
                                selected.parent.title === item.title &&
                                "sidebar-svg"
                              }`}
                        onClick={() => {
                          if (
                            selected.parent.title === item.title &&
                            selected.parent.isActive &&
                            item.inner
                          ) {
                            routeChangeHandler(item);
                          }
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="13"
                          height="8"
                          viewBox="0 0 13 8"
                          fill="none"
                        >
                          <path
                            d="M0.267406 0.598758C0.438678 0.427537 0.670942 0.331351 0.913121 0.331351C1.1553 0.331351 1.38756 0.427537 1.55883 0.598758L6.07975 5.11967L10.6007 0.598758C10.7729 0.43239 11.0036 0.340333 11.2431 0.342413C11.4826 0.344494 11.7116 0.440547 11.881 0.609883C12.0503 0.779219 12.1463 1.00829 12.1484 1.24776C12.1505 1.48723 12.0585 1.71793 11.8921 1.89019L6.72546 7.05681C6.55419 7.22803 6.32193 7.32422 6.07975 7.32422C5.83757 7.32422 5.6053 7.22803 5.43403 7.05681L0.267406 1.89019C0.0961862 1.71891 0 1.48665 0 1.24447C0 1.00229 0.0961862 0.77003 0.267406 0.598758Z"
                            fill={
                              selected.parent.title === item.title &&
                              selected.parent.isActive
                                ? "#ffffff"
                                : "#8F8F8F"
                            }
                          />
                        </svg>
                      </div>
                    )}
                  </Link>

                  {selected.parent.title === item.title &&
                    selected.parent.isActive &&
                    selected.child && (
                      <>
                        {item.inner &&
                          item.inner.map((it, ind) => {
                            return (
                              <motion.div
                                className="mt-2 px-3"
                                key={ind}
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.4 }}
                              >
                                <Link
                                  href={{
                                    pathname: it.pathname,
                                    query: item.query
                                      ? {
                                          [String(item.queryName)]: it.query,
                                        }
                                      : {},
                                  }}
                                  onClick={() => filterHandler(it.query)}
                                  className={`text-sm text-[#4B4B4B] hover:bg-[#E9E1FF] rounded-lg font-medium tracking-[0.5px] px-3 py-2 w-full text-start block ${
                                    router.query.status === it.query
                                      ? "bg-primary hover:bg-primary text-white"
                                      : ""
                                  }`}
                                >
                                  {translation(it.title)}
                                </Link>
                              </motion.div>
                            );
                          })}
                      </>
                    )}
                </React.Fragment>
              )
            );
          })}
        </div>
      </div>

      <div className="ml-7 mr-4 border-t border-t-[#0000001A] pt-[31px] block xMini:hidden">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-x-3 cursor-pointer"
            onClick={handleLogout}
          >
            <LogoutIcon />
            <span className="text-[#4B4B4B] text-sm font-medium">
              {translate("common.logout")}
            </span>
          </div>
          <LanguageSelector />
        </div>
      </div>
      <div className={`ms-3 ${userRole === 0 ? "absolute bottom-0" : "mt-16"}`}>
        <Image src={logo} alt="Logo" className="mt-auto pb-32  ml-3 " />
      </div>
    </div>
  );
};

export default SideBar;
