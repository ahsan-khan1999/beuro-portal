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
import { useState } from "react";
import { sideBar } from "@/utils/static";
import { PlanIcon } from "@/assets/svgs/components/sideBar/plan";
import { PaymentIcon } from "@/assets/svgs/components/sideBar/payment";
import { SupportRequestIcon } from "@/assets/svgs/components/sideBar/supportRequest";
export const svgs = {
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
  plans: <PlanIcon />,
  payment: <PaymentIcon />,
  SupportRequest: <SupportRequestIcon />,
  setting: <SettingsIcon />,
  dummy: <></>,
};
const SideBar = () => {
  const userRole = 0
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<number | null>(null);
  return (
    <div className="fixed overflow-x-hidden  overflow-y-scroll  bg-white rounded-r-[6px] ">
      <div className="max-w-[247px] pt-6 px-4 pb-8   relative      sidebar-height    flex flex-col">
        <div className="space-y-3 ">
          {sideBar.map((item, index) => {
            return (
              <div key={index}>
                {item.title == "divider" ? <div className="my-6 border-b border-[#0000001A]" /> : !item.inner && item.role.includes(userRole) ? (
                  <button
                    onClick={() => item.pathname && router.push(item.pathname)}
                    className={`flex items-center px-3 py-2 w-full ${router.pathname === item.pathname &&
                      "bg-primary rounded-lg"
                      } ${item.className}`}
                  >

                    <span
                      className={`${router.pathname === item.pathname && "sidebar-svg"
                        } mr-2 `}
                    >
                      {item.icon && svgs[item.icon]}
                    </span>
                    <span
                      className={` font-medium tracking-[0.5px] ${router.pathname === item.pathname
                        ? "text-white"
                        : " text-[#4B4B4B]"
                        }`}
                    >
                      {item.title}
                    </span>
                  </button>
                ) : item.role.includes(userRole) ? (
                  <>
                    <button
                      onClick={() => {
                        isOpen == index ? setIsOpen(null) : setIsOpen(index);
                      }}
                      className={`flex  justify-between items-center px-3 py-2 w-full ${router.pathname === item.pathname &&
                        "bg-primary rounded-lg"
                        }`}
                    >
                      <div className="flex items-center">

                        <span
                          className={`${router.pathname === item.pathname && "sidebar-svg"
                            } mr-2 `}
                        >
                          {item.icon && svgs[item.icon]}
                        </span>
                        <span
                          className={` font-medium tracking-[0.5px] ${router.pathname === item.pathname
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
                          ${router.pathname === item.pathname && "sidebar-svg"
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
                      item.inner && item.inner.map((it, ind) => {
                        return (
                          <div className=" mt-3 ml-8 px-3" key={ind}>
                            <button className="text-[#4B4B4B] font-medium tracking-[0.5px]  "
                              onClick={() => it.pathname && router.push(it.pathname)}

                            >
                              {it.title}
                            </button>
                          </div>
                        );
                      })}
                  </>
                ) : null}

              </div>
            );
          })}
        </div>

        <Image src={logo} alt="Logo" className=" mt-auto pt-10 ml-3 pb-2" />
      </div>
    </div>
  );
};

export default SideBar;
