// components/WavesChart.js
import { useEffect } from "react";
import Chart from "chart.js/auto";

const WavesChart = ({ datatest }) => {
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

  return (
    <div className="bg-white p-6 w-full rounded-[20px] ">
      <div className="flex items-center justify-between mb-10">
        <h3 className="font-medium text-[#18181B]">Sales Report</h3>
        <div>
          <button className="w-20 h-7 rounded-[5px] border border-[#A1A1AA] font-medium text-[#18181B] text-xs">
            12 Months
          </button>
          <button className="w-20 h-7 rounded-[5px]  font-medium text-[#18181B] text-xs">
            6 Months
          </button>
          <button className="w-20 h-7 rounded-[5px]  font-medium text-[#18181B] text-xs">
            30 Days
          </button>
          <button className="w-20 h-7 rounded-[5px]  font-medium text-[#18181B] text-xs">
            7 Days
          </button>
        </div>
      </div>
      <canvas className="min-w-full max-h-[300px] z-[50]" id="myWavesChart" />
    </div>
  );
};

export default WavesChart;
``;
