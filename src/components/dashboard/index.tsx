import { Layout } from "@/layout";
import React, { useState } from "react";
import DashboardFunctions from "./Functions";
import PieChart from "./chart";
import DashboardCard from "./Cards";
import { Button } from "@/base-components/ui/button/button";
import Image from "next/image";

import SelectField from "@/base-components/filter/fields/select-field";
import InputField from "@/base-components/filter/fields/input-field";
import { FollowUpNotificationBar } from "./notification-bar/FollowUp";
import ActivitiesNotificationBar from "./notification-bar/Activities";

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
      id: "202705 ",
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
  const [isOpen, setIsOpen] = useState("");
  const [filter, setFilter] = useState({
    text: "",
    sortBy: "",
    type: "None",
    location: "",
  });
  return (
    <Layout>
      <div className="p-9 bg-gradient rounded-lg">
        <h1 className="font-medium text-[28px] tracking-[0.5px] text-white">
          Customer Dashboard
        </h1>
      </div>
      {/* <div className="p-4 max-w-[463px] rounded-lg mt-[-30px] bg-white shadow-dashboardSearch flex  items-center mx-auto ">
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
          className="ml-4 w-full focus:outline-none border-r mr-3 pr-2 border-[#BFBFBF]"
          placeholder="Search..."
          name="search"
          type="text"
        />
        <SelectField
          handleChange={(value) => console.log(value)}
          value=""
          dropDownIconClassName=""
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          options={[
            "All",
            "Lead",
            "Offer",
            "Contract",
            "Invoice",
            "Receipt",
            "Customer",
          ]}
          label="All"
          containerClassName="mx-0  "
        />
      </div> */}
      <InputField
        handleChange={(value) => setFilter({ ...filter, ["text"]: value })}
        value={filter.text}
        iconDisplay={true}
        containerClassName="p-4 max-w-[463px] rounded-lg mt-[-30px] bg-white shadow-dashboardSearch flex space-x-1 items-center mx-auto"
        textClassName="ml-4 w-full  focus:outline-none border-r mr-3 pr-2 border-[#BFBFBF] py-0 rounded-none "
      />
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
        <FollowUpNotificationBar />
        <ActivitiesNotificationBar />
        <PieChart data={data} />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
