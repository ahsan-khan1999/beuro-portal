import { Layout } from "@/layout";
import React, { useEffect, useState } from "react";
import DashboardFunctions from "./Functions";
import PieChart from "./chart";
import DashboardCard from "./Cards";
import { FollowUpNotificationBar } from "./notification-bar/FollowUp";
import ActivitiesNotificationBar from "./notification-bar/Activities";
import leadsIcon from "@/assets/svgs/leads.svg";
import offersIcon from "@/assets/svgs/offers.svg";
import contractsIcon from "@/assets/svgs/contracts.svg";
import salesIcon from "@/assets/svgs/sales.svg";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import MainCalender from "./calendar";
import SearchInputFiled from "@/base-components/filter/fields/search-input-fields";

const AdminDashboard = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const dashboardCards = [
    {
      icon: leadsIcon,
      alt: "leads icon",
      title: `${translate("dashboard_detail.cards_title.lead")}`,
      subTitle: "2378 Leads",
      id: "202504 ",
      salePercent: "+4.5%",
      backgroundColor: "bg-gradient",
      chartPointColor: "#5114EA",
      open: "2782 Open",
      closed: "2782 Close",
      expired: "2782 Expired",
      route: () => router.push("/leads"),
    },
    {
      icon: offersIcon,
      alt: "offers icon",
      title: `${translate("dashboard_detail.cards_title.offer")}`,
      subTitle: "2378 Offers",
      id: "202326 ",
      salePercent: "-4.5%",
      backgroundColor: "bg-dashboardCard2-gradient",
      chartPointColor: "#FC3576",
      open: "2782 Open",
      closed: "2782 Signed",
      expired: "2782 Expired",
      route: () => router.push("/offers"),
    },
    {
      icon: contractsIcon,
      alt: "contracts icon",
      title: `${translate("dashboard_detail.cards_title.contracts")}`,
      subTitle: "2378 Contracts",
      id: "202505 ",
      salePercent: "+4.5%",
      backgroundColor: "bg-dashboardCard3-gradient",
      chartPointColor: "#FE8D46",
      open: "2782 Open",
      closed: "2782 Confirmed",
      expired: "2782 Cancelled",
      route: () => router.push("/contract"),
    },
    {
      icon: salesIcon,
      alt: "sales icon",
      title: `${translate("dashboard_detail.cards_title.sales")}`,
      subTitle: "2378 Sales",
      id: "202705 ",
      salePercent: "+4.5%",
      backgroundColor: "bg-gradient",
      chartPointColor: "#5114EA",
      open: "2782 Open",
      closed: "2782 Overdue",
      expired: "2782 Paid",
      route: () => router.push("/dashboard"),
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
      `${translate("dashboard_detail.charts_labels.website")}`,
      `${translate("dashboard_detail.charts_labels.google")}`,
      `${translate("dashboard_detail.charts_labels.facebook")}`,
      `${translate("dashboard_detail.charts_labels.insta")}`,
      `${translate("dashboard_detail.charts_labels.pinterest")}`,
      `${translate("dashboard_detail.charts_labels.whatsapp")}`,
    ],
  };

  const [filter, setFilter] = useState({
    text: "",
    sortBy: "",
    type: "None",
    location: "",
  });

  return (
    <>
      <div className="p-9 bg-gradient rounded-lg">
        <h1 className="font-medium text-[28px] tracking-[0.5px] text-white">
          {translate("dashboard_detail.main_heading")}
        </h1>
      </div>

      <SearchInputFiled
        handleChange={(value) => setFilter({ ...filter, ["text"]: value })}
        value={filter.text}
        iconDisplay={true}
        containerClassName="py-4 pl-4 max-w-[400px] mlg:max-w-[642px]  rounded-lg mt-[-30px] bg-white shadow-dashboardSearch flex space-x-1 items-center mx-auto"
        textClassName="ml-4 w-full focus:outline-none border-[#BFBFBF] py-0 rounded-none "
      />

      <DashboardFunctions />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-5 ">
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
              route={item.route}
            />
          );
        })}
      </div>
      {/* <div className="mt-[51px] grid grid-cols-1  gap-x-[18px]">
        <MainCalender />

      </div> */}
      <div className="mt-[51px] grid grid-cols-2 2xl:grid-cols-3 gap-x-[18px] ">
        <div className="hidden 2xl:block">
          <FollowUpNotificationBar />
        </div>
        <ActivitiesNotificationBar />
        <PieChart data={data} />
      </div>
    </>
  );
};

export default AdminDashboard;
