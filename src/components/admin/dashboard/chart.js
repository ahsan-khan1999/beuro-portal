// components/PieChart.js
import { useEffect } from "react";
import Chart from "chart.js/auto";
import { useTranslation } from "next-i18next";

const PieChart = ({ data }) => {
  const { t: translate } = useTranslation();

  useEffect(() => {
    // Get the canvas element
    const ctx = document.getElementById("myPieChart").getContext("2d");

    // Create a new pie chart instance
    const myPieChart = new Chart(ctx, {
      type: "pie",
      data: data,
      options: {
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    // Clean up the chart when the component is unmounted
    return () => {
      myPieChart.destroy();
    };
  }, []);

  return (
    <div className="rounded-[20px] bg-white h-[402.005px]">
      <h3 className="pt-5 pb-3 ml-[40px] font-medium text-[#18181B]">
        {translate("admin.overview.plans")}
      </h3>

      <div className="flex justify-center items-center h-[340px] py-5 border-t border-[#000] border-opacity-10">
        <div className="w-fit h-fit">
          <canvas id="myPieChart" />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
