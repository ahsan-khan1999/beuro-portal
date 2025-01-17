import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { useTranslation } from "next-i18next";

const WavesChart = ({ datatest }) => {
  const { t: translate } = useTranslation();
  const [filterButton, setFilterButton] = useState("12 Months");

  useEffect(() => {
    const ctx = document.getElementById("myWavesChart").getContext("2d");

    const wavesChart = new Chart(ctx, {
      type: "line",
      data: datatest,
      fill: true,

      options: {
        scales: {
          x: {
            type: "category",
            position: "bottom",
          },
          y: {
            display: false,
            title: {
              display: false,
              text: "Wave Height (meters)",
            },
            beginAtZero: false,
          },
        },
      },
    });

    return () => {
      wavesChart.destroy();
    };
  }, [datatest]);

  const filterButtons = [
    `${translate("admin.overview.sales_report.twelve_months")}`,
    `${translate("admin.overview.sales_report.six")}`,
    `${translate("admin.overview.sales_report.thirty_day")}`,
    `${translate("admin.overview.sales_report.seven_days")}`,
  ];

  return (
    <div className="bg-white p-6 w-full h-[402.005px] rounded-[20px]">
      <div className="flex items-center justify-between mb-10">
        <h3 className="font-medium text-[#18181B]">
          {translate("admin.overview.sales_report.heading")}
        </h3>
        <div className="grid grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {filterButtons?.map((item, index) => (
            <button
              key={index}
              onClick={() => setFilterButton(item)}
              className={`w-20 h-7 rounded-[5px] ${
                filterButton === item ? "border border-[#A1A1AA]" : ""
              } font-medium text-[#18181B] text-xs`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <canvas className="min-w-full max-h-[300px] z-[50]" id="myWavesChart" />
    </div>
  );
};

export default WavesChart;
``;
