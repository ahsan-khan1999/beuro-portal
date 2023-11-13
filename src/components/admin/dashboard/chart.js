// components/PieChart.js
import { useEffect } from "react";
import Chart from "chart.js/auto";

const PieChart = ({ data }) => {
  useEffect(() => {
    // Get the canvas element
    const ctx = document.getElementById("myPieChart").getContext("2d");

    // Create a new pie chart instance
    const myPieChart = new Chart(ctx, {
      type: "pie",
      data: data,
    });

    // Clean up the chart when the component is unmounted
    return () => {
      myPieChart.destroy();
    };
  }, [data]);

  return (
    <div className="max-w-[300px] mx-auto ">
      <canvas id="myPieChart" width="400" height="400"></canvas>
    </div>
  );
};

export default PieChart;
