import companyLogo from "@/assets/svgs/company-logo.svg";
import createOfferIcon from "@/assets/svgs/create-offer.svg";
import userIcon from "@/assets/svgs/user.svg";
import { LanguageSelector } from "@/base-components/languageSelector/language-selector";
import FollowUpDropDown from "@/components/FollowUpDropDown";
import logo from "@/assets/svgs/logo.svg";
import customersIcon from "@/assets/svgs/customers.svg";

import Image from "next/image";
import { useRouter } from "next/router";
import { CustomerSsvg } from "@/assets/svgs/components/test";
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
import { useState } from "react";
export default function Home() {
  const [isOpen, setIsOpen] = useState<number>(null);
  const sideBar = [
    {
      icon: "Dashboard",
      title: "Dashboard",
      pathname: "/",
      role: [0, 1],
    },
    {
      icon: "Customers",
      title: "Customers",
      pathname: "/dashboard",
      role: [0, 1],
    },
    {
      icon: "Leads",
      title: "Leads",
      pathname: "/dashboard",
      role: [0, 1],
      inner: [
        {
          title: "Open",
        },
        {
          title: "Close",
        },
        {
          title: "Expire",
        },
      ],
    },
    {
      icon: "Offers",
      title: "Offers",
      pathname: "/dashboard",
      role: [0, 1],
      inner: [
        {
          title: "Accepted",
        },
        {
          title: "Rejected",
        },
        {
          title: "Pending",
        },
      ],
    },
    {
      icon: "Contracts",
      title: "Contracts",
      pathname: "/dashboard",
      role: [0, 1],
      inner: [
        {
          title: "Accepted",
        },
        {
          title: "Rejected",
        },
        {
          title: "Pending",
        },
      ],
    },
    {
      icon: "Invoices",
      title: "Invoices",
      pathname: "/dashboard",
      role: [0, 1],
      inner: [
        {
          title: "Accepted",
        },
        {
          title: "Rejected",
        },
        {
          title: "Pending",
        },
      ],
    },
    {
      icon: "Services",
      title: "Services",
      pathname: "/dashboard",
      role: [0, 1],
    },
    {
      icon: "Employees",
      title: "Employees",
      pathname: "/dashboard",
      role: [0, 1],
    },
    {
      icon: "Content",
      title: "Content",
      pathname: "/dashboard",
      role: [0, 1],
    },
    {
      icon: "MailTracker",
      title: "Mail Tracker",
      pathname: "/dashboard",
      role: [0, 1],
      margin: "mb-6",
    },
    "devider",
    {
      icon: "Settings",
      title: "Settings",
      pathname: "/",
      role: [0, 1],
      inner: [
        {
          title: "Accepted",
        },
        {
          title: "Rejected",
        },
        {
          title: "Pending",
        },
      ],
      margin: "mt-6",
    },
    {
      icon: "ContactSupports",
      title: "Contact Supports",
      pathname: "/contact-supports",
      role: [0, 1],
    },
  ];
  const svgs = {
    Dashboard: <DashboardIcon />,
    Customers: <CustomersIcon />,
    Leads: <LeadsIcon />,
    Offers: <OffersIcon />,
    Contracts: <ContractsIcon />,
    Invoices: <InvoicesIcon />,
    Services: <ServicesIcon />,
    Employees: <EmployeesIcon />,
    Content: <ContentIcon />,
    MailTracker: <MailTrackerIcon />,
    Settings: <SettingsIcon />,
    ContactSupports: <ContactSupportsIcon />,
  };
  const router = useRouter();
  return (
    <div className="max-w-[1440px] mx-auto">
      <div className="p-4 flex justify-between items-center shadow-header z-50">
        <div className="flex items-center">
          <Image
            src={companyLogo}
            alt="Company Logo"
            className="pr-[50px] border-r-2 border-[#000000] border-opacity-10"
          />
          <span className="font-medium text-2xl tracking-[0.15px] text-dark pl-8">
            Solar EEG{" "}
          </span>
        </div>
        <div className="flex items-center">
          <div className="flex items-center pr-8">
            <div className="relative menu  mr-6">
              <Image src={createOfferIcon} alt="Create Offer Icon" />
              <FollowUpDropDown />
            </div>
            <LanguageSelector />
          </div>
          <div className="border-l-2 border-[#000000] border-opacity-10 flex items-center pl-8">
            <Image src={userIcon} alt="User Icon" className="mr-3" />
            <div className="">
              <span className="font-semibold tracking-[0.5px] text-[#0A0A0A] block">
                Khanif Alfan
              </span>
              <span className="text-sm tracking-[0.4 px] text-[#8F8F8F] block">
                Manager
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed overflow-x-hidden  overflow-y-scroll mt-[14px] bg-smoke-white rounded-r-[6px]">
        <div className="max-w-[247px] pt-6 px-4 pb-8   relative      sidebar-height    flex flex-col">
          <div className="space-y-3 ">
            {sideBar.map((item, index) => {
              return (
                <div key={index}>
                  {!item.inner ? (
                    <button
                      // onClick={()=>router.push(item.pathname)}
                      className={`flex items-center px-3 py-2 w-full ${
                        router.pathname === item.pathname &&
                        "bg-primary rounded-lg"
                      }`}
                    >
                      {/* <Image
                      src={customersIcon}
                      alt="Customers Icon"
                      className="mr-2"
                    /> */}
                      <span
                        className={`${
                          router.pathname === item.pathname && "sidebar-svg"
                        } mr-2 `}
                        // dangerouslySetInnerHTML={{ __html: svgs[item.icon] }}
                      >
                        {svgs[item.icon]}
                      </span>
                      <span
                        className={` font-medium tracking-[0.5px] ${
                          router.pathname === item.pathname
                            ? "text-white"
                            : " text-[#4B4B4B]"
                        }`}
                      >
                        {item.title}
                      </span>
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          isOpen == index ? setIsOpen(null) : setIsOpen(index);
                        }}
                        className={`flex  justify-between items-center px-3 py-2 w-full ${
                          router.pathname === item.pathname &&
                          "bg-primary rounded-lg"
                        }`}
                      >
                        <div className="flex items-center">
                          {/* <Image
                        src={customersIcon}
                        alt="Customers Icon"
                        className="mr-2"
                      /> */}
                          <span
                            className={`${
                              router.pathname === item.pathname && "sidebar-svg"
                            } mr-2 `}
                            // dangerouslySetInnerHTML={{ __html: svgs[item.icon] }}
                          >
                            {svgs[item.icon]}
                          </span>
                          <span
                            className={` font-medium tracking-[0.5px] ${
                              router.pathname === item.pathname
                                ? "text-white"
                                : " text-[#4B4B4B]"
                            }`}
                          >
                            {item.title}
                          </span>
                        </div>
                        <div
                          className={`
                          cursor-pointer  ${isOpen == index ? "rotate-180" : ""}
                          ${
                            router.pathname === item.pathname && "sidebar-svg"
                          }`}
                        >
                          <svg
                            className={` `}
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="8"
                            viewBox="0 0 13 8"
                            fill="none"
                          >
                            <path
                              d="M0.267406 0.598758C0.438678 0.427537 0.670942 0.331351 0.913121 0.331351C1.1553 0.331351 1.38756 0.427537 1.55883 0.598758L6.07975 5.11967L10.6007 0.598758C10.7729 0.43239 11.0036 0.340333 11.2431 0.342413C11.4826 0.344494 11.7116 0.440547 11.881 0.609883C12.0503 0.779219 12.1463 1.00829 12.1484 1.24776C12.1505 1.48723 12.0585 1.71793 11.8921 1.89019L6.72546 7.05681C6.55419 7.22803 6.32193 7.32422 6.07975 7.32422C5.83757 7.32422 5.6053 7.22803 5.43403 7.05681L0.267406 1.89019C0.0961862 1.71891 0 1.48665 0 1.24447C0 1.00229 0.0961862 0.77003 0.267406 0.598758Z"
                              fill="#8F8F8F"
                            />
                          </svg>
                        </div>
                      </button>
                      {isOpen == index &&
                        item.inner.map((it, ind) => {
                          return (
                            <div className=" mt-3 ml-8 px-3">
                              <button className="text-[#4B4B4B] font-medium tracking-[0.5px]  ">
                                {it.title}
                              </button>
                            </div>
                          );
                        })}
                    </>
                  )}
                  {item.title?.includes("Mail Tracker") && (
                    <div className="my-6">
                      <hr className="text-[#0000001A] absolute w-full left-0  " />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <Image src={logo} alt="Logo" className=" mt-auto pt-10 ml-3 pb-2" />
        </div>
      </div>
    </div>
  );
}
