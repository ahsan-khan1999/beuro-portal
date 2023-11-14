import React, { useEffect } from "react";
import Chart from "chart.js/auto";
interface DashboardCard {
  backgroundColor: string;
  title: string;
  id: string;
  salePercent: string;
  chartPointColor: string;
}
const DashboardCard = ({
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
        backgroundColor: "black",
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
    const ctx = document.getElementById(id).getContext("2d");

    const wavesChart2 = new Chart(ctx, {
      type: "line",
      data: datatest2,
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

    // Ensure cleanup of the previous chart before creating a new one
    if (wavesChart2) {
      return wavesChart2.destroy();
    }
  }, [datatest2, id]);

  return (
    // <div className={`rounded-[20px] py-[38px] pl-10 pr-8 ${backgroundColor}`}>
    //   <div className="flex items-center mb-8">
    //     <h3 className="text-xl text-white font-semibold">{title}</h3>
    //   </div>
    //   <div className="flex items-center justify-between">
    //     <div className="flex items-center">
    //       <span className="text-xl font-medium text-white">{id}</span>
    //       <span className="text-white ml-[10px]">{salePercent}</span>
    //     </div>
    //   </div>
    // </div>
        <canvas id={id} className="max-w-[78px] max-h-[50px] z-50" />
  );
};

export default DashboardCard;
