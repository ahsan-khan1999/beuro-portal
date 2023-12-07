import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

interface DashboardCard {
  icon: string | StaticImport;
  alt: string;
  backgroundColor: string;
  title: string;
  subTitle: string;
  id: string;
  salePercent: string;
  chartPointColor: string;
  open: string;
  closed: string;
  expired: string;
  route: Function;
}
const DashboardCard = ({
  icon,
  alt,
  backgroundColor,
  title,
  subTitle,
  id,
  salePercent,
  chartPointColor,
  open,
  closed,
  expired,
  route,
}: DashboardCard) => {
  const datatest2 = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "",
        data: [10, 11.5, 11, 12.5],
        tension: 0.4,
        borderColor: "white",
        backgroundColor: chartPointColor,
        // borderColor: Utils.CHART_COLORS.red,
        // backgroundColor: Utils.CHART_COLORS.red,
      },
    ],
  };
  useEffect(() => {
    var existingChart = Chart.getChart(id);
    if (existingChart) {
      existingChart.destroy();
    }
    //@ts-expect-error
    const ctx = document.getElementById(id).getContext("2d");

    const wavesChart2 = new Chart(ctx, {
      type: "line",
      data: datatest2,
      //@ts-expect-error
      fill: true,
      options: {
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },

        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    });

    return () => {
      wavesChart2.destroy();
    };
  }, []);

  return (
    <div
      onClick={() => route()}
      className={`cursor-pointer rounded-[20px] py-[22px] px-4 hover:shadow-lg ${backgroundColor}`}
    >
      <div className="flex items-center mb-8">
      
        <Image src={icon} alt={alt} />
        <div className="ml-2 space-y-1">
          <h3 className="text-xlMonthly text-white font-semibold ">{title}</h3>
          <span className="text-xs text-white  ">{subTitle}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-medium text-white">{id}</span>
          <span className="text-white ml-[10px]">{salePercent}</span>
        </div>
        <canvas id={id} className="max-w-[78px] max-h-[50px]" />
      </div>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="9"
            viewBox="0 0 7 9"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.02249 3.85536L2.29481 2.15695L3.69869 0.282911C3.72949 0.241789 3.76944 0.208408 3.81538 0.185416C3.86132 0.162424 3.91199 0.150453 3.96336 0.150453C4.01474 0.150453 4.0654 0.162424 4.11135 0.185416C4.15729 0.208408 4.19724 0.241789 4.22803 0.282911L5.63184 2.15695L6.90416 3.85536C6.94098 3.90449 6.96339 3.96291 6.96889 4.02406C6.97438 4.08521 6.96274 4.14669 6.93527 4.2016C6.9078 4.25651 6.86558 4.30269 6.81335 4.33496C6.76112 4.36723 6.70093 4.38433 6.63953 4.38432L5.29807 4.38432L5.29807 8.15918L2.62858 8.15918L2.62858 4.38432L1.28712 4.38432C1.22571 4.38434 1.16552 4.36725 1.11328 4.33498C1.06104 4.30271 1.01881 4.25653 0.991341 4.20162C0.963868 4.1467 0.95223 4.08522 0.957731 4.02406C0.963231 3.96291 0.985654 3.90449 1.02249 3.85536Z"
              fill="white"
            />
          </svg>
          <span className="ml-[3px] text-white font-medium text-xs">
            {open}
          </span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="9"
            viewBox="0 0 7 9"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.0089 4.45715L4.7259 6.16982L3.31022 8.05959C3.27917 8.10106 3.23888 8.13472 3.19255 8.1579C3.14623 8.18109 3.09514 8.19316 3.04333 8.19316C2.99152 8.19316 2.94043 8.18109 2.8941 8.1579C2.84778 8.13472 2.80749 8.10106 2.77644 8.05959L1.36084 6.16982L0.0778375 4.45715C0.0407092 4.4076 0.018109 4.34869 0.0125684 4.28703C0.00702785 4.22536 0.0187657 4.16337 0.0464673 4.108C0.0741688 4.05263 0.11674 4.00606 0.169412 3.97352C0.222084 3.94097 0.282776 3.92374 0.344691 3.92374H1.69741L1.69741 0.117187L4.38932 0.117187L4.38932 3.92374L5.74205 3.92374C5.80397 3.92372 5.86467 3.94095 5.91735 3.97349C5.97003 4.00604 6.0126 4.0526 6.04031 4.10798C6.06801 4.16336 6.07975 4.22535 6.0742 4.28702C6.06865 4.34869 6.04604 4.4076 6.0089 4.45715Z"
              fill="white"
            />
          </svg>
          <span className="ml-[3px] text-white font-medium text-xs">
            {closed}
          </span>
        </div>
        <span className="ml-[3px] text-white font-medium text-xs">
          {expired}
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;
