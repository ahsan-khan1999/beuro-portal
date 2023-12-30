import { Layout } from "@/layout";
import React, { useEffect, useState } from "react";
import DashboardFunctions from "./Functions";
import PieChart from "./chart";
import WavesChart from "./waves";
import DashboardCard from "@/base-components/ui/dashboard-card";
import InputField from "@/base-components/filter/fields/input-field";
import activeSubscribersIcon from "@/assets/svgs/leads.svg";
import pendingCompaniesIcon from "@/assets/svgs/pending-companies.svg";
import customersIcon from "@/assets/svgs/customers-card.svg";
import { useTranslation } from "next-i18next";
import SearchInputFiled from "@/base-components/filter/fields/search-input-fields";
import { Dashboard, FilterType } from "@/types";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { readAdminDashboard, readDashboard } from "@/api/slices/authSlice/auth";
interface ActionType {
  type: string;
  payload: Dashboard
}
const AdminDashboard = () => {
  const { t: translate } = useTranslation();
  const dispatch = useAppDispatch()
  const { adminDashboard } = useAppSelector(state => state.auth)
  const [filter, setFilter] = useState<FilterType>({
    month: 1,
  });
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
  const dashboardCards = [
    {
      icon: activeSubscribersIcon,
      alt: "active subscribers icon",
      title: `${translate("admin.overview.subscriber")}`,
      id: "202504 ",
      salePercent: "+4.5%",
      backgroundColor: "bg-gradient",
      chartPointColor: "#5114EA",
    },
    {
      icon: pendingCompaniesIcon,
      alt: "pending companies icon",
      title: `${translate("admin.overview.companies")}`,
      id: "202326 ",
      salePercent: "-4.5%",
      backgroundColor: "bg-dashboardCard2-gradient",
      chartPointColor: "#FC3576",
    },
    {
      icon: customersIcon,
      alt: "customers icon",
      title: `${translate("admin.overview.customers")}`,
      id: adminDashboard?.Customer?.filterCustomers,
      salePercent: "+4.5%",
      backgroundColor: "bg-dashboardCard3-gradient",
      chartPointColor: "#FE8D46",
    },
  ];

  useEffect(() => {
    dispatch(readAdminDashboard({ params: { filter: filter } }))
  }, [])
  const handleFilterChange = (query: FilterType) => {
    dispatch(
      readAdminDashboard({ params: { filter: { month: query?.month } } })
    );
  };
  // Sample data for the pie chart
  const data = {
    datasets: [
      {
        data: [20, 20, 20, 40],
        backgroundColor: ["#FE9244", "#FF376F", "#4A13E7", "#45C769"],
      },
    ],
    labels: ["Silver", "Gold", "Diamond", "Infinite"],
  };

  const datatest = {
    labels: [
      `${translate("admin.overview.months_name.jan")}`,
      `${translate("admin.overview.months_name.jan")}`,
      `${translate("admin.overview.months_name.jan")}`,
      `${translate("admin.overview.months_name.jan")}`,
      `${translate("admin.overview.months_name.jan")}`,
      `${translate("admin.overview.months_name.jan")}`,
      `${translate("admin.overview.months_name.jan")}`,
      `${translate("admin.overview.months_name.jan")}`,
      `${translate("admin.overview.months_name.jan")}`,
      `${translate("admin.overview.months_name.jan")}`,
      `${translate("admin.overview.months_name.jan")}`,
      `${translate("admin.overview.months_name.jan")}`,
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 25, 40, 30, 40, 50, 40, 50, 60, 50, 60],
        tension: 0.4,
        borderColor: "#4A13E7",
        backgroundColor: "blue",
        // borderColor: Utils.CHART_COLORS.red,
        // backgroundColor: Utils.CHART_COLORS.red,
      },
      {
        label: "Dataset 2",
        data: [15, 25, 15, 45, 35, 45, 25, 45, 55, 35, 55, 65],
        tension: 0.4,
        borderColor: "#FE9244",

        // borderColor: Utils.CHART_COLORS.blue,
        // backgroundColor: Utils.CHART_COLORS.blue,
      },
    ],
  };

  return (
    <Layout>
      <div className="p-9 bg-gradient rounded-lg">
        <h1 className="font-medium text-[28px] tracking-[0.5px] text-white">
          {translate("admin.main_heading")}
        </h1>
      </div>
      <SearchInputFiled
        handleChange={(value) => setFilter({ ...filter, ["text"]: value })}
        value={filter.text}
        iconDisplay={true}
        containerClassName="p-4 max-w-[463px] rounded-lg mt-[-30px] bg-white shadow-dashboardSearch flex space-x-1 items-center mx-auto"
        textClassName="ml-4 w-full  focus:outline-none pr-2 border-[#BFBFBF] py-0 rounded-none "
      />
      <DashboardFunctions filter={filter} setFilter={setFilter} handleFilterChange={handleFilterChange} />

      <div className="grid grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-5">
        {dashboardCards.map((item, index) => {
          return (
            <DashboardCard
              key={index}
              icon={item.icon}
              alt={item.alt}
              backgroundColor={item.backgroundColor}
              title={item.title}
              id={item.id}
              salePercent={item.salePercent}
              chartPointColor={item.chartPointColor}
            />
          );
        })}
      </div>
      <div className="mt-[60px] grid-cols-1 grid lg:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-5">
        <div className="xl:col-span-2">
          <WavesChart datatest={datatest} />
        </div>
        <div className="xl:col-span-1">
          <PieChart data={data} />
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
