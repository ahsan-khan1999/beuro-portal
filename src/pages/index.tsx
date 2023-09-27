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
export default function Home() {
  const sideBar = [
    {
      icon: "Dashboard",
      title: "Dashboard",
      pathname: "/dashboard",
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
      inner: true,
    },
    {
      icon: "Offers",
      title: "Offers",
      pathname: "/dashboard",
      role: [0, 1],
      inner: true,
    },
    {
      icon: "Contracts",
      title: "Contracts",
      pathname: "/dashboard",
      role: [0, 1],
      inner: true,
    },
    {
      icon: "Invoices",
      title: "Invoices",
      pathname: "/dashboard",
      role: [0, 1],
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
      icon: "Mail Tracker",
      title: "Mail Tracker",
      pathname: "/dashboard",
      role: [0, 1],
      margin: "mb-6",
    },
    {
      icon: "Settings",
      title: "Settings",
      pathname: "/dashboard",
      role: [0, 1],
      margin: "mt-6",
    },
    {
      icon: "ContactSupports",
      title: "Contact Supports",
      pathname: "/",
      role: [0, 1],
    },
  ];
  const svgs = {
    ContactSupports: <CustomerSsvg />,
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
      <div className="max-w-[247px] pt-6 px-4 pb-8 bg-smoke-white mt-[14px] relative">
        <div className="space-y-3 ">
          {sideBar.map((item, index) => {
            return (
              <div key={index}>
                {!item.inner ? (
                  <div className={`flex items-center px-3 py-2 `}>
                    {/* <Image
                      src={customersIcon}
                      alt="Customers Icon"
                      className="mr-2"
                    /> */}
                    <span
                      className={router.pathname === item.pathname && "tests"}
                      // dangerouslySetInnerHTML={{ __html: svgs[item.icon] }}
                    >
                      {svgs[item.icon]}
                    </span>
                    <span className="text-[#4B4B4B] font-medium tracking-[0.5px]">
                      {item.title}
                    </span>
                  </div>
                ) : (
                  <div
                    className={`flex  justify-between items-center px-3 py-2 `}
                  >
                    <div className="flex items-center">
                      <Image
                        src={customersIcon}
                        alt="Customers Icon"
                        className="mr-2"
                      />
                      <span className="text-[#4B4B4B] font-medium tracking-[0.5px]">
                        {item.title}
                      </span>
                    </div>
                    <svg
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
                )}
                {item.title.includes("Mail Tracker") && (
                  <div className="my-6">
                    <hr className="text-[#0000001A] absolute w-full left-0  " />
                  </div>
                )}
              </div>
              // <hr className="text-[#0000001A] " />
              //  <div className="flex justify-between items-center px-3 py-2">
              //   <div className="flex items-center ">
              //     <Image
              //       src={customersIcon}
              //       alt="Customers Icon"
              //       className="mr-2"
              //     />
              //     <span className="text-[#4B4B4B] font-medium tracking-[0.5px]">
              //       Customers
              //     </span>
              //   </div>
              //   <svg
              //     xmlns="http://www.w3.org/2000/svg"
              //     width="13"
              //     height="8"
              //     viewBox="0 0 13 8"
              //     fill="none"
              //   >
              //     <path
              //       d="M0.565258 0.598758C0.73653 0.427537 0.968794 0.331351 1.21097 0.331351C1.45315 0.331351 1.68541 0.427537 1.85669 0.598758L6.3776 5.11967L10.8985 0.598758C11.0708 0.43239 11.3015 0.340333 11.5409 0.342413C11.7804 0.344494 12.0095 0.440547 12.1788 0.609883C12.3482 0.779219 12.4442 1.00829 12.4463 1.24776C12.4484 1.48723 12.3563 1.71793 12.1899 1.89019L7.02331 7.05681C6.85204 7.22803 6.61978 7.32422 6.3776 7.32422C6.13542 7.32422 5.90316 7.22803 5.73188 7.05681L0.565258 1.89019C0.394038 1.71891 0.297852 1.48665 0.297852 1.24447C0.297852 1.00229 0.394038 0.77003 0.565258 0.598758Z"
              //       fill="#8F8F8F"
              //     />
              //   </svg>
              // </div>
            );
          })}
        </div>
        <Image src={logo} alt="Logo" />
      </div>
    </div>
  );
}
