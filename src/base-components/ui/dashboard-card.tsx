import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
interface DashboardCard {
  icon: string | StaticImport;
  alt: string;
  backgroundColor: string;
  title: string;
  id: string;
  salePercent: string;
  chartPointColor: string;
}
const DashboardCard = ({
  icon,
  alt,
  backgroundColor,
  title,
  id,
  salePercent,
  chartPointColor,
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
  }, [datatest2]);

  return (
    <div className={`rounded-[20px] pt-[37px] p-4 lg:pl-[39px] lg:pr-[31px] lg:pb-[42px] ${backgroundColor}`}>
      <div className="flex items-center mb-8">
        <Image src={icon} alt={alt} className="mr-3" />
        <h3 className="text-xl text-white font-semibold">{title}</h3>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-medium text-white">{id}</span>
          <span className="text-white ml-[10px]">{salePercent}</span>
        </div>
        <canvas id={id} className="max-w-[78px] max-h-[50px]" />
      </div>
    </div>
  );
};

export default DashboardCard;
