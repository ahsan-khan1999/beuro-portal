import { Layout } from "@/layout";
import React, { useState } from "react";
import DashboardFunctions from "./Functions";
import PieChart from "./chart";
import DashboardCard from "./Cards";
import InputField from "@/base-components/filter/fields/input-field";
import { FollowUpNotificationBar } from "./notification-bar/FollowUp";
import ActivitiesNotificationBar from "./notification-bar/Activities";
import leadsIcon from "@/assets/svgs/leads.svg";
import offersIcon from "@/assets/svgs/offers.svg";
import contractsIcon from "@/assets/svgs/contracts.svg";
import salesIcon from "@/assets/svgs/sales.svg";

const AdminDashboard = () => {
  const dashboardCards = [
    {
      icon: leadsIcon,
      alt: "leads icon",
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
      icon: offersIcon,
      alt: "offers icon",
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
      icon: contractsIcon,
      alt: "contracts icon",
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
      icon: salesIcon,
      alt: "sales icon",
      title: "Sales",
      subTitle: "2378 Sales",
      id: "202705 ",
      salePercent: "+4.5%",
      backgroundColor: "bg-gradient",
      chartPointColor: "#5114EA",
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
              icon={item.icon}
              alt={item.alt}
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
      <div className="mt-[60px]  grid grid-cols-3">
        <FollowUpNotificationBar />
        <ActivitiesNotificationBar />
        <PieChart data={data} />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
