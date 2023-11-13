// components/WavesChart.js
import { useEffect } from "react";
import Chart from "chart.js/auto";

const WavesChart = ({ data }) => {
  useEffect(() => {
    const ctx = document.getElementById("myWavesChart").getContext("2d");

    const wavesChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: data.labels,
        datasets: [{
          label: "Wave Height",
          borderColor: "#36A2EB",
          data: data.waveHeight,
          fill: true,
        }],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            display:false,
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
