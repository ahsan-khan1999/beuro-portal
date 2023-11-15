// components/WavesChart.js
import { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const WavesChart = ({ datatest }) => {
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
  const filterButtons = ["12 Months", "6 Months", "30 Days", "7 Days"];

  return (
    <div className="bg-white p-6 w-full rounded-[20px] ">
      <div className="flex items-center justify-between mb-10">
        <h3 className="font-medium text-[#18181B]">Sales Report</h3>
        <div>
          {filterButtons.map((item, index) => {
            return (
              <button
                onClick={() => setFilterButton(item)}
                className={`w-20 h-7 rounded-[5px] ${
                  filterButton == item && "border border-[#A1A1AA]"
                } font-medium text-[#18181B] text-xs`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>
      <canvas className="min-w-full max-h-[300px] z-[50]" id="myWavesChart" />
    </div>
  );
};

export default WavesChart;
``;
