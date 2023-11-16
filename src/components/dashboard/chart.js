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
      options: {
        plugins: {
          legend: {
            position: "bottom",
            maxWidth: "10px",
            labels: {
              // color:"#fff",

              boxWidth: 15,
              // padding:"0px"
              // padding: {
              //   top:20
              // },
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
    <div className="rounded-[20px] bg-white max-w-[400px]">
      <h3 className="pt-5 pb-3 px-10 font-medium text-[#18181B]">Plans</h3>
      <hr className="h-[1px] text-black opacity-10 pb-11" />
      <div className="px-6 pb-5">
        <div className="max-w-[300px] mx-auto ">
          <canvas className="asd" id="myPieChart" width="300" height="300" />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
