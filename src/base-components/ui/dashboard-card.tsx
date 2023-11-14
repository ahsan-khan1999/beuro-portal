import React, { useEffect } from "react";
import Chart from "chart.js/auto";
interface DashboardCard {
  backgroundColor: string;
  title: string;
  id: string;
  salePercent: string;
}
const DashboardCard = ({
  backgroundColor,
  title,
  id,
  salePercent,
}: DashboardCard) => {
  const datatest2 = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Dataset 1",
        data: [10, 20, 25, 40, 30, 40, 50, 40, 50, 60, 50, 20],
        tension: 0.4,
        borderColor: "#4A13E7",
        backgroundColor: "blue",

        // borderColor: Utils.CHART_COLORS.red,
        // backgroundColor: Utils.CHART_COLORS.red,
      },
      {
        label: "Dataset 2",
        data: [15, 25, 15, 45, 35, 45, 25, 45, 55, 35, 55, 65],
        tension: 0.4,
        borderColor: "#FE9244",

        // borderColor: Utils.CHART_COLORS.blue,
        // backgroundColor: Utils.CHART_COLORS.blue,
      },
    ],
  };
  useEffect(() => {
    const ctx = document?.getElementById(id).getContext("2d");
    let wavesChart2 = new Chart(ctx, {
      type: "line",
      data: datatest2,
      fill: true,
      options: {
        plugins: {},
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

    // Ensure cleanup of the previous chart before creating a new one
    if (wavesChart2) {
      return wavesChart2.destroy();
    }
  }, [datatest2, id]);


  return (
    // <div className={`rounded-[20px] py-[38px] pl-10 pr-8 ${backgroundColor}`}>
    //   <div className="flex items-center mb-8">
    //     <h3 className="text-xl text-white font-semibold">{title}</h3>
    //   </div>
    //   <div className="flex items-center justify-between">
    //     <div className="flex items-center">
    //       <span className="text-xl font-medium text-white">{id}</span>
    //       <span className="text-white ml-[10px]">{salePercent}</span>
    //     </div>
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="104"
    //       height="27"
    //       viewBox="0 0 104 27"
    //       fill="none"
    //     >
    //       <path
    //         d="M3.12793 24.137H7.96611C10.295 24.137 12.4591 22.9461 13.7029 20.9779L16.9211 15.8941C18.1648 13.9259 20.3321 12.735 22.6579 12.735C24.6634 12.735 26.5664 11.8488 27.8567 10.3128L30.3753 7.31535C31.6657 5.77932 33.5687 4.89315 35.5742 4.89315H37.3776C39.5169 4.89315 41.5317 5.90059 42.8128 7.61385L53.3815 21.7304C56.6744 26.6494 62.5324 25.6015 62.5324 25.6015C64.6934 25.6015 68.3096 23.4219 69.5876 21.6806L70.4333 20.5302C71.7144 18.7889 73.7448 17.7597 75.9058 17.7597H78.6048C80.9088 17.7597 83.0543 16.5906 84.3073 14.6566L89.4969 6.6344C90.7468 4.70037 92.8954 3.53125 95.1994 3.53125H100.709"
    //         stroke="white"
    //         stroke-width="2.02"
    //         stroke-miterlimit="10"
    //       />
    //       <path
    //         d="M36.1482 7.84422C37.8289 7.84422 39.1914 6.48173 39.1914 4.80101C39.1914 3.1203 37.8289 1.75781 36.1482 1.75781C34.4675 1.75781 33.105 3.1203 33.105 4.80101C33.105 6.48173 34.4675 7.84422 36.1482 7.84422Z"
    //         fill="white"
    //       />
    //       <path
    //         d="M74.24 20.9067C75.9207 20.9067 77.2832 19.5442 77.2832 17.8635C77.2832 16.1828 75.9207 14.8203 74.24 14.8203C72.5593 14.8203 71.1968 16.1828 71.1968 17.8635C71.1968 19.5442 72.5593 20.9067 74.24 20.9067Z"
    //         fill="white"
    //       />
    //       <path
    //         d="M100.292 6.78758C101.972 6.78758 103.335 5.42509 103.335 3.74437C103.335 2.06366 101.972 0.701172 100.292 0.701172C98.611 0.701172 97.2485 2.06366 97.2485 3.74437C97.2485 5.42509 98.611 6.78758 100.292 6.78758Z"
    //         fill="white"
    //       />
    //       <path
    //         d="M3.14183 26.8696C4.82255 26.8696 6.18504 25.5071 6.18504 23.8264C6.18504 22.1457 4.82255 20.7832 3.14183 20.7832C1.46112 20.7832 0.0986328 22.1457 0.0986328 23.8264C0.0986328 25.5071 1.46112 26.8696 3.14183 26.8696Z"
    //         fill="white"
    //       />
    //       <path
    //         d="M102.835 3.73052C102.835 5.14254 101.69 6.28721 100.278 6.28721C98.8663 6.28721 97.7217 5.14254 97.7217 3.73052C97.7217 2.3185 98.8663 1.17383 100.278 1.17383C101.69 1.17383 102.835 2.3185 102.835 3.73052Z"
    //         fill="#FF376F"
    //         stroke="white"
    //       />
    //       <path
    //         d="M76.7833 17.877C76.7833 19.289 75.6386 20.4337 74.2266 20.4337C72.8146 20.4337 71.6699 19.289 71.6699 17.877C71.6699 16.465 72.8146 15.3203 74.2266 15.3203C75.6386 15.3203 76.7833 16.465 76.7833 17.877Z"
    //         fill="#FF376F"
    //         stroke="white"
    //       />
    //       <path
    //         d="M38.7184 4.8145C38.7184 6.22652 37.5737 7.37119 36.1617 7.37119C34.7496 7.37119 33.605 6.22652 33.605 4.8145C33.605 3.40248 34.7496 2.25781 36.1617 2.25781C37.5737 2.25781 38.7184 3.40248 38.7184 4.8145Z"
    //         fill="#FF376F"
    //         stroke="white"
    //       />
    //       <path
    //         d="M5.68467 23.8399C5.68467 25.2519 4.54 26.3966 3.12798 26.3966C1.71596 26.3966 0.571289 25.2519 0.571289 23.8399C0.571289 22.4279 1.71596 21.2832 3.12798 21.2832C4.54 21.2832 5.68467 22.4279 5.68467 23.8399Z"
    //         fill="#FF376F"
    //         stroke="white"
    //       />
    //     </svg>
    //   </div>
    // </div>
    <canvas id={id} className="" />
  );
};

export default DashboardCard;
