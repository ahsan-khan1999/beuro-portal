// components/WavesChart.js
import { useEffect } from "react";
import Chart from "chart.js/auto";

const WavesChart = ({ data }) => {
  const datatest = {
    labels: ["JAN", "JAN", "JAN", "JAN", "JAN", "JAN", "JAN"],
    datasets: [
      {
        label: 'Dataset 1',
        data: [10, 30, 39, 20, 25, 34, -10],
        tension: 0.4,

        // borderColor: Utils.CHART_COLORS.red,
        // backgroundColor: Utils.CHART_COLORS.red,
      },
      {
        label: 'Dataset 2',
        data: [18, 33, 22, 19, 11, 39, 30],
    tension: 0.4,

        // borderColor: Utils.CHART_COLORS.blue,
        // backgroundColor: Utils.CHART_COLORS.blue,
      }
    ],

  };
  console.log(data?.waveHeight);
  useEffect(() => {
    const ctx = document.getElementById("myWavesChart").getContext("2d");

    const wavesChart = new Chart(ctx, {
      type: "line",
      data: datatest,
      fill: true,


      options: {
        scales: {
          x: {
            type: 'category',
            position: 'bottom',
          },
          y: {
            display: false,
            title: {
              display: false,
              text: 'Wave Height (meters)',
            },
            beginAtZero: false,
          },
        },
      },
    });

    return () => {
      wavesChart.destroy();
    };
  }, [data]);

  return (
    <div className="w-full">
      <canvas className="min-w-full max-h-[421px]" id="myWavesChart" ></canvas>
    </div>
  );
};

export default WavesChart;
``
