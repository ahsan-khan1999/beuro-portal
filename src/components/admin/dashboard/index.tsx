import { Layout } from "@/layout";
import React from "react";
import DashboardFunctions from "./Functions";
import PieChart from "./chart";
import WavesChart from "./waves";
import DashboardCard from "@/base-components/ui/dashboard-card";

const AdminDashboard = () => {
  const dashboardCards = [
    {
      title: "Active Subscribers",
      id: "202504 ",
      salePercent: "+4.5%",
      backgroundColor: "bg-gradient",
    },
    {
      title: "Pending Compnies",
      id: "202326 ",
      salePercent: "-4.5%",
      backgroundColor: "bg-dashboardCard2-gradient",
    },
    {
      title: "Customers",
      id: "202504 ",
      salePercent: "+4.5%",
      backgroundColor: "bg-dashboardCard3-gradient",
    },
  ];
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
  const data2 = {
    labels: ["Feb","Mar","Apr","May","Jun"], // X-axis labels (time or other variable)
    waveHeight: [0, 0.5, 1.2, 1.8, 1.5, 0.8, 0.2], // Y-axis data (wave height)
  };

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
      <div className="grid grid-cols-3 gap-x-6">
        {dashboardCards.map((item, index) => {
          return (
            <DashboardCard
              backgroundColor={item.backgroundColor}
              title={item.title}
              id={item.id}
              salePercent={item.salePercent}
            />
          );
        })}
      </div>
      <div className="mt-[60px] space-x-5 flex justify-between">
        <WavesChart data={data2} />
        <PieChart data={data} />
      </div>
    </Layout>
  );
};

export default AdminDashboard;
