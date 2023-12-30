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
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { readDashboard } from "@/api/slices/authSlice/auth";
import { Dashboard, FilterType } from "@/types";
import { FiltersDefaultValues } from "@/enums/static";
interface ActionType {
  type: string;
  payload: Dashboard
}
const AdminDashboard = () => {
  const { t: translate } = useTranslation();
  const router = useRouter();
  const { dashboard } = useAppSelector(state => state.auth)
  const [pieData, setPieData] = useState({
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
  })
  const [filter, setFilter] = useState<FilterType>({
    month: 1,
  });
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(readDashboard({ params: { filter: filter } })).then((response: ActionType) => {
      if (response?.payload) {
        setPieData({
          datasets: [
            {
              data: response?.payload?.leadSource?.map((item) => item?.totalLeadSource),
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
          labels: response?.payload?.leadSource?.map((item) => item?._id)
        })
      }
    })
  }, [])

  const dashboardCards = [
    {
      icon: leadsIcon,
      alt: "leads icon",
      title: `${translate("dashboard_detail.cards_title.lead")}`,
      subTitle: dashboard?.Lead?.totalLeads + " Leads",
      id: dashboard?.Lead?.filterCount,
      salePercent: "+" + dashboard?.Lead?.percentage + "%",
      backgroundColor: "bg-gradient",
      chartPointColor: "#5114EA",
      open: dashboard?.Lead?.opened + " Open",
      closed: dashboard?.Lead?.closed + " Close",
      expired: dashboard?.Lead?.expired + " Expired",
      route: () => router.push("/leads"),
    },
    {
      icon: offersIcon,
      alt: "offers icon",
      title: `${translate("dashboard_detail.cards_title.offer")}`,
      subTitle: dashboard?.Offer?.totalOffers + "Offers",
      id: dashboard?.Offer?.filterCount,
      salePercent: "+" + dashboard?.Offer?.percentage + "%",
      backgroundColor: "bg-dashboardCard2-gradient",
      chartPointColor: "#FC3576",
      open: dashboard?.Offer?.opened + " Open",
      closed: dashboard?.Offer?.signed + " Signed",
      expired: dashboard?.Offer?.expired + " Expired",
      route: () => router.push("/offers"),
    },
    {
      icon: contractsIcon,
      alt: "contracts icon",
      title: `${translate("dashboard_detail.cards_title.contracts")}`,
      subTitle: dashboard?.Contract?.totalContract + " Contracts",
      id: dashboard?.Contract?.filterCount,
      salePercent: "+" + dashboard?.Contract?.percentage + "%",
      backgroundColor: "bg-dashboardCard3-gradient",
      chartPointColor: "#FE8D46",
      open: dashboard?.Contract?.opened + " Open",
      closed: dashboard?.Contract?.confirmed + " Confirmed",
      expired: dashboard?.Contract?.cancelled + " Cancelled",
      route: () => router.push("/contract"),
    },
    {
      icon: salesIcon,
      alt: "sales icon",
      title: `${translate("dashboard_detail.cards_title.sales")}`,
      subTitle: dashboard?.Sales?.totalSales + " Sales",
      id: dashboard?.Sales?.filterCount,
      salePercent: "+" + dashboard?.Sales?.percentage + "%",
      backgroundColor: "bg-gradient",
      chartPointColor: "#5114EA",
      open: dashboard?.Sales?.pending + " Open",
      closed: dashboard?.Sales?.overdue + " Overdue",
      expired: dashboard?.Sales?.paid + " Paid",
      route: () => router.push("/dashboard"),
    },
  ];
  // Sample data for the pie chart


  const handleFilterChange = (query: FilterType) => {
    dispatch(
      readDashboard({ params: { filter: { month: query?.month } } })
    );
  };

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

      <DashboardFunctions filter={filter} setFilter={setFilter} handleFilterChange={handleFilterChange} />

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-6 gap-y-5 ">
        {dashboardCards.map((item, index) => {
          return (
            <DashboardCard
              icon={item.icon}
              alt={item.alt}
              backgroundColor={item.backgroundColor}
              title={item.title}
              subTitle={item.subTitle}
              id={item?.id?.toString() as string}
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
      <div className="mt-[51px] grid grid-cols-2 2xl:grid-cols-3 gap-x-[18px] mb-10">
        <div className="hidden 2xl:block">
          <FollowUpNotificationBar />
        </div>
        <ActivitiesNotificationBar />
        <PieChart data={pieData} />
      </div>
    </>
  );
};

export default AdminDashboard;
