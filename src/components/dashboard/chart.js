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
            maxWidth: "10px",
            labels: {
              boxWidth: 15,
            },
          },
        },
      },
    });

    document
      .querySelector(".chart-legend-custom-padding")
      ?.classList.add("chart-legend-custom-padding");
    // Clean up the chart when the component is unmounted
    return () => {
      myPieChart.destroy();
    };
  }, [data]);

  return (
    <div className="rounded-[20px] bg-white h-[397.089px]">
      <h3 className="pt-5 pb-3 ml-[40px] font-medium text-[#18181B]">
        {translate("dashboard_detail.lead_source")}
      </h3>

      <hr className="h-[1px] text-black opacity-10" />

      <div className="flex justify-center items-center h-[340px] py-5">
        <canvas className="asd" id="myPieChart" />
      </div>
    </div>
  );
};

export default PieChart;
