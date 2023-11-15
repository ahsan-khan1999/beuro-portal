import { Layout } from "@/layout";
import React from "react";
import DashboardFunctions from "./Functions";
import PieChart from "./chart";
import DashboardCard from "./Cards";
import { Button } from "@/base-components/ui/button/button";
import Image from "next/image";
import followUpIcon from "@/assets/svgs/follow-up.svg";
import timeIcon from "@/assets/svgs/time.svg";
import idIcon from "@/assets/svgs/id.svg";

const AdminDashboard = () => {
  const dashboardCards = [
    {
      title: "Leads",
      subTitle: "2378 Leads",
      id: "202504 ",
      salePercent: "+4.5%",
      backgroundColor: "bg-gradient",
      chartPointColor: "#5114EA",
      open: "2782 Open",
      closed: "2782 Close",
      expired: "2782 Expired",
    },
    {
      title: "Offers",
      subTitle: "2378 Offers",
      id: "202326 ",
      salePercent: "-4.5%",
      backgroundColor: "bg-dashboardCard2-gradient",
      chartPointColor: "#FC3576",
      open: "2782 Open",
      closed: "2782 Signed",
      expired: "2782 Expired",
    },
    {
      title: "Contracts",
      subTitle: "2378 Contracts",
      id: "202505 ",
      salePercent: "+4.5%",
      backgroundColor: "bg-dashboardCard3-gradient",
      chartPointColor: "#FE8D46",
      open: "2782 Open",
      closed: "2782 Confirmed",
      expired: "2782 Cancelled",
    },
    {
      title: "Sales",
      subTitle: "2378 Sales",
      id: "202505 ",
      salePercent: "+4.5%",
      backgroundColor: "bg-dashboardCard3-gradient",
      chartPointColor: "#FE8D46",
      open: "2782 Open",
      closed: "2782 Overdue",
      expired: "2782 Paid",
    },
  ];
  // Sample data for the pie chart
  const data = {
    datasets: [
      {
        data: [40, 10, 10, 10, 15, 15],
        backgroundColor: [
          "#FE9244",
          "#FF376F",
          "#4A13E7",
          "#45C769",
          "#7B18FF",
          "#221177",
        ],
      },
    ],
    labels: [
      "Website",
      "Google",
      "Facebook",
      "Instagram",
      "Pinterest",
      "Whatsapp",
    ],
  };
  const followUp = [
    { id: "A-2000" },
    { id: "A-2000" },
    { id: "A-2000" },
    { id: "A-2000" },
    { id: "A-2000" },
    { id: "A-2000" },
  ];

  return (
    <Layout>
      <div className="p-9 bg-gradient rounded-lg">
        <h1 className="font-medium text-[28px] tracking-[0.5px] text-white">
          Super Admin
        </h1>
      </div>
      <div className="p-4 max-w-[463px] rounded-lg mt-[-30px] bg-white shadow-dashboardSearch flex  items-center mx-auto ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.89746 11.7188C5.89746 8.40975 8.58846 5.71875 11.8975 5.71875C15.2065 5.71875 17.8975 8.40975 17.8975 11.7188C17.8975 15.0278 15.2065 17.7188 11.8975 17.7188C8.58846 17.7188 5.89746 15.0278 5.89746 11.7188ZM21.6045 20.0117L18.2095 16.6158C19.2625 15.2618 19.8975 13.5647 19.8975 11.7188C19.8975 7.30775 16.3085 3.71875 11.8975 3.71875C7.48646 3.71875 3.89746 7.30775 3.89746 11.7188C3.89746 16.1297 7.48646 19.7188 11.8975 19.7188C13.7435 19.7188 15.4405 19.0837 16.7945 18.0308L20.1905 21.4258C20.3855 21.6208 20.6415 21.7188 20.8975 21.7188C21.1535 21.7188 21.4095 21.6208 21.6045 21.4258C21.9955 21.0347 21.9955 20.4028 21.6045 20.0117Z"
            fill="#BFBFBF"
          />
          <mask
            id="mask0_2278_93826"
            // style="mask-type:luminance"
            maskUnits="userSpaceOnUse"
            x="3"
            y="3"
            width="19"
            height="19"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M5.89746 11.7188C5.89746 8.40975 8.58846 5.71875 11.8975 5.71875C15.2065 5.71875 17.8975 8.40975 17.8975 11.7188C17.8975 15.0278 15.2065 17.7188 11.8975 17.7188C8.58846 17.7188 5.89746 15.0278 5.89746 11.7188ZM21.6045 20.0117L18.2095 16.6158C19.2625 15.2618 19.8975 13.5647 19.8975 11.7188C19.8975 7.30775 16.3085 3.71875 11.8975 3.71875C7.48646 3.71875 3.89746 7.30775 3.89746 11.7188C3.89746 16.1297 7.48646 19.7188 11.8975 19.7188C13.7435 19.7188 15.4405 19.0837 16.7945 18.0308L20.1905 21.4258C20.3855 21.6208 20.6415 21.7188 20.8975 21.7188C21.1535 21.7188 21.4095 21.6208 21.6045 21.4258C21.9955 21.0347 21.9955 20.4028 21.6045 20.0117Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_2278_93826)"></g>
        </svg>
        <input
          className="ml-4 w-full focus:outline-none"
          placeholder="Search..."
          name="search"
          type="text"
        />
      </div>
      <DashboardFunctions />

      <div className="grid grid-cols-4 gap-x-6">
        {dashboardCards.map((item, index) => {
          return (
            <DashboardCard
              backgroundColor={item.backgroundColor}
              title={item.title}
              subTitle={item.subTitle}
              id={item.id}
              salePercent={item.salePercent}
              chartPointColor={item.chartPointColor}
              open={item.open}
              closed={item.closed}
              expired={item.expired}
            />
          );
        })}
      </div>
      <div className="mt-[60px] space-x-5 flex justify-between">
        <div className="bg-white rounded-[20px] shadow-followUp w-[380px] max-h-[400px]   ml-2 mt-1 ">
          <div className=" pt-5 pb-3 px-4 border-b-2 border-[#000] border-opacity-10">
            <h1 className="text-[#18181B]  font-medium">Follow Ups</h1>
          </div>
          <div className="overflow-y-scroll max-h-[340px]">
            {followUp.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`pt-[10px] px-4 cursor-pointer ${
                    (index == 0 || index == 1) && "bg-primary"
                  } bg-opacity-10 `}
                >
                  <div className=" pb-[5px]  flex items-center border-b border-[#000] border-opacity-10 ">
                    <Image
                      src={followUpIcon}
                      alt="Follow Up Icon"
                      className="mr-6"
                    />
                    <div>
                      <div>
                        <span className="text-dark text-sm">
                          Recent Follow up:{" "}
                        </span>
                        <span className="text-dark text-sm font-medium">
                          Call for information of cleaning and moving services
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center ">
                          <Image
                            src={timeIcon}
                            alt="Time Icon"
                            className="mr-[10px]"
                          />
                          <span className="text-[#393939] text-xs ">
                            14:20:05,12/09/2023
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Image
                            src={idIcon}
                            alt="Id Icon"
                            className="mr-[10px]"
                          />
                          <span className="text-[#4B4B4B] text-xs ">
                            {item.id}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Image
                            src={idIcon}
                            alt="Id Icon"
                            className="mr-[10px]"
                          />
                          <span className="text-[#4B4B4B] text-xs ">
                            {item.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-center py-4">
              <button className=" text-primary w-fit text-sm font-medium ">
                View All
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[20px] shadow-followUp w-[380px] max-h-[400px]   ml-2 mt-1 ">
          <div className=" pt-5 pb-3 px-4 border-b-2 border-[#000] border-opacity-10">
            <h1 className="text-[#18181B]  font-medium">Activity</h1>
          </div>
          <div className="overflow-y-scroll max-h-[340px]">
            {followUp.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`pt-[10px] px-4 cursor-pointer ${
                    (index == 0 || index == 1) && "bg-primary"
                  } bg-opacity-10 `}
                >
                  <div className=" pb-[5px]  flex items-center border-b border-[#000] border-opacity-10 ">
                    <div>
                      <div>
                        <span className="text-dark text-sm">
                          Hassam Ud dien&nbsp;
                        </span>
                        <span className="text-dark text-sm font-medium">
                          Converted Offer to Contract
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center ">
                          <Image
                            src={timeIcon}
                            alt="Time Icon"
                            className="mr-[10px]"
                          />
                          <span className="text-[#393939] text-xs ">
                            14:20:05,12/09/2023
                          </span>
                        </div>
                        <div className="flex justify-between items-center ">
                          <span className="mr-3 text-white bg-primary text-xs rounded-[2px] px-1 py-0.5 font-medium">
                            {item.id}
                          </span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="11"
                            viewBox="0 0 16 11"
                            fill="none"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M9.59296 0.144579L12.5071 2.32761L15.7225 4.73638C15.7931 4.78921 15.8503 4.85776 15.8898 4.93659C15.9292 5.01541 15.9498 5.10235 15.9498 5.19049C15.9498 5.27864 15.9292 5.36557 15.8898 5.4444C15.8503 5.52323 15.7931 5.59178 15.7225 5.64461L12.5071 8.05325L9.59296 10.2363C9.50866 10.2995 9.40843 10.3379 9.30351 10.3473C9.19858 10.3568 9.0931 10.3368 8.99889 10.2897C8.90467 10.2425 8.82544 10.1701 8.77007 10.0805C8.71469 9.99084 8.68537 9.88757 8.68537 9.78223L8.68537 7.48057L0.683594 7.48057L0.683593 2.90029L8.68537 2.90029L8.68537 0.59863C8.68535 0.493273 8.71466 0.389992 8.77003 0.300358C8.8254 0.210724 8.90463 0.138281 8.99886 0.0911423C9.09308 0.0440041 9.19857 0.024036 9.3035 0.0334736C9.40843 0.0429111 9.50866 0.0813843 9.59296 0.144579Z"
                              fill="#FE9244"
                            />
                          </svg>
                          <span className="ml-3 text-white text-xs bg-[#45C769] rounded-[2px] px-1 py-0.5 font-medium">
                            {item.id}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="flex justify-center py-4">
              <button className=" text-primary w-fit text-sm font-medium ">
                View All
              </button>
            </div>
          </div>
        </div>
        <PieChart data={data} />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
