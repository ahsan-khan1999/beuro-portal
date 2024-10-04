import { useEffect } from "react";
import Chart from "chart.js/auto";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

const PieChart = ({ data }) => {
  useEffect(() => {
    if (
      data &&
      data.datasets &&
      data.datasets.length > 0 &&
      data.datasets[0].data.length > 0
    ) {
      const ctx = document.getElementById("myPieChart").getContext("2d");

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

      return () => {
        myPieChart?.destroy();
      };
    }
  }, [data]);

  return (
    <div className="rounded-[20px] bg-white h-[397.089px]">
      <h3 className="pt-5 pb-3 ml-[40px] text-base font-semibold text-[#18181B]">
        {translate("dashboard_detail.lead_source")}
      </h3>

      <div className="border-t border-[#000] border-opacity-10 w-full">
        {!data ||
        !data?.datasets ||
        data?.datasets?.length === 0 ||
        data?.datasets[0]?.data?.length === 0 ? (
          <NoDataEmptyState
            className="my-3 w-full"
            imgClassName="w-[120px] h-[112px]"
            containerClassName="px-6"
          />
        ) : (
          <div className="flex justify-center items-center h-[340px] py-5">
            <div className="w-fit h-fit">
              <canvas className="asd" id="myPieChart" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PieChart;
