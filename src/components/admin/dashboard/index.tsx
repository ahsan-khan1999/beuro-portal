import { Layout } from "@/layout";
import React from "react";
import DashboardFunctions from "./Functions";
import PieChart from "./chart";
import WavesChart from "./waves";

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
    labels: [1, 2, 3, 4, 5, 6, 7], // X-axis labels (time or other variable)
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
            <div
              className={`rounded-[20px] py-[38px] pl-10 pr-8 ${item.backgroundColor}`}
            >
              <div className="flex items-center mb-8">
                <h3 className="text-xl text-white font-semibold">
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-xl font-medium text-white">
                    {item.id}
                  </span>
                  <span className="text-white ml-[10px]">
                    {item.salePercent}
                  </span>
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="104"
                  height="27"
                  viewBox="0 0 104 27"
                  fill="none"
                >
                  <path
                    d="M3.12793 24.137H7.96611C10.295 24.137 12.4591 22.9461 13.7029 20.9779L16.9211 15.8941C18.1648 13.9259 20.3321 12.735 22.6579 12.735C24.6634 12.735 26.5664 11.8488 27.8567 10.3128L30.3753 7.31535C31.6657 5.77932 33.5687 4.89315 35.5742 4.89315H37.3776C39.5169 4.89315 41.5317 5.90059 42.8128 7.61385L53.3815 21.7304C56.6744 26.6494 62.5324 25.6015 62.5324 25.6015C64.6934 25.6015 68.3096 23.4219 69.5876 21.6806L70.4333 20.5302C71.7144 18.7889 73.7448 17.7597 75.9058 17.7597H78.6048C80.9088 17.7597 83.0543 16.5906 84.3073 14.6566L89.4969 6.6344C90.7468 4.70037 92.8954 3.53125 95.1994 3.53125H100.709"
                    stroke="white"
                    stroke-width="2.02"
                    stroke-miterlimit="10"
                  />
                  <path
                    d="M36.1482 7.84422C37.8289 7.84422 39.1914 6.48173 39.1914 4.80101C39.1914 3.1203 37.8289 1.75781 36.1482 1.75781C34.4675 1.75781 33.105 3.1203 33.105 4.80101C33.105 6.48173 34.4675 7.84422 36.1482 7.84422Z"
                    fill="white"
                  />
                  <path
                    d="M74.24 20.9067C75.9207 20.9067 77.2832 19.5442 77.2832 17.8635C77.2832 16.1828 75.9207 14.8203 74.24 14.8203C72.5593 14.8203 71.1968 16.1828 71.1968 17.8635C71.1968 19.5442 72.5593 20.9067 74.24 20.9067Z"
                    fill="white"
                  />
                  <path
                    d="M100.292 6.78758C101.972 6.78758 103.335 5.42509 103.335 3.74437C103.335 2.06366 101.972 0.701172 100.292 0.701172C98.611 0.701172 97.2485 2.06366 97.2485 3.74437C97.2485 5.42509 98.611 6.78758 100.292 6.78758Z"
                    fill="white"
                  />
                  <path
                    d="M3.14183 26.8696C4.82255 26.8696 6.18504 25.5071 6.18504 23.8264C6.18504 22.1457 4.82255 20.7832 3.14183 20.7832C1.46112 20.7832 0.0986328 22.1457 0.0986328 23.8264C0.0986328 25.5071 1.46112 26.8696 3.14183 26.8696Z"
                    fill="white"
                  />
                  <path
                    d="M102.835 3.73052C102.835 5.14254 101.69 6.28721 100.278 6.28721C98.8663 6.28721 97.7217 5.14254 97.7217 3.73052C97.7217 2.3185 98.8663 1.17383 100.278 1.17383C101.69 1.17383 102.835 2.3185 102.835 3.73052Z"
                    fill="#FF376F"
                    stroke="white"
                  />
                  <path
                    d="M76.7833 17.877C76.7833 19.289 75.6386 20.4337 74.2266 20.4337C72.8146 20.4337 71.6699 19.289 71.6699 17.877C71.6699 16.465 72.8146 15.3203 74.2266 15.3203C75.6386 15.3203 76.7833 16.465 76.7833 17.877Z"
                    fill="#FF376F"
                    stroke="white"
                  />
                  <path
                    d="M38.7184 4.8145C38.7184 6.22652 37.5737 7.37119 36.1617 7.37119C34.7496 7.37119 33.605 6.22652 33.605 4.8145C33.605 3.40248 34.7496 2.25781 36.1617 2.25781C37.5737 2.25781 38.7184 3.40248 38.7184 4.8145Z"
                    fill="#FF376F"
                    stroke="white"
                  />
                  <path
                    d="M5.68467 23.8399C5.68467 25.2519 4.54 26.3966 3.12798 26.3966C1.71596 26.3966 0.571289 25.2519 0.571289 23.8399C0.571289 22.4279 1.71596 21.2832 3.12798 21.2832C4.54 21.2832 5.68467 22.4279 5.68467 23.8399Z"
                    fill="#FF376F"
                    stroke="white"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-[60px] space-x-5 flex justify-between">
        <WavesChart data={data2} />
        <div className="rounded-[20px] bg-white max-w-[400px]">
          <h3 className="pt-5 pb-3 px-10 font-medium text-[#18181B]">Plans</h3>
          <hr className="h-[1px] text-black opacity-10 pb-11" />
          <div className="px-6 pb-5">
            <PieChart data={data} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
