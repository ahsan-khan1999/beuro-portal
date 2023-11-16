import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
interface DashboardCard {
  icon: string | StaticImport;
  alt: string;
  backgroundColor: string;
  title: string;
  subTitle: string;
  id: string;
  salePercent: string;
  chartPointColor: string;
  open: string;
  closed: string;
  expired: string;
}
const DashboardCard = ({
  icon,
  alt,
  backgroundColor,
  title,
  subTitle,
  id,
  salePercent,
  chartPointColor,
  open,
  closed,
  expired,
}: DashboardCard) => {
  const datatest2 = {
    labels: ["Jan", "Feb", "Mar", "Apr"],
    datasets: [
      {
        label: "",
        data: [10, 11.5, 11, 12.5],
        tension: 0.4,
        borderColor: "white",
        backgroundColor: chartPointColor,
        // borderColor: Utils.CHART_COLORS.red,
        // backgroundColor: Utils.CHART_COLORS.red,
      },
    ],
  };
  useEffect(() => {
    var existingChart = Chart.getChart(id);
    if (existingChart) {
      existingChart.destroy();
    }
    const ctx = document.getElementById(id).getContext("2d");

    const wavesChart2 = new Chart(ctx, {
      type: "line",
      data: datatest2,
      fill: true,
      options: {
        plugins: {
          legend: {
            display: false, // Hide the legend
          },
        },

        scales: {
          x: {
            display: false,
          },
          y: {
            display: false,
          },
        },
      },
    });

    return () => {
      wavesChart2.destroy();
    };
  }, [datatest2]);

  return (
    <div className={`rounded-[20px] py-[38px] pl-10 pr-8 ${backgroundColor}`}>
      <div className="flex items-center mb-8">
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="34"
          height="35"
          viewBox="0 0 34 35"
          fill="none"
        >
          <rect
            x="0.917969"
            y="1.26758"
            width="32.2438"
            height="32.2438"
            rx="7.5"
            fill="white"
            stroke="#EFF4FA"
          />
          <path
            d="M22.8532 17.5632C22.7992 17.4527 22.7992 17.326 22.8532 17.2156L23.3537 16.1917C23.6323 15.6216 23.4115 14.9422 22.851 14.6448L21.8443 14.1106C21.7357 14.053 21.6613 13.9505 21.64 13.8294L21.4431 12.7069C21.3335 12.0819 20.7553 11.6619 20.1272 11.7508L18.9988 11.9104C18.877 11.9276 18.7566 11.8884 18.6682 11.803L17.8491 11.0106C17.3931 10.5694 16.6786 10.5694 16.2226 11.0106L15.4035 11.803C15.3151 11.8885 15.1946 11.9276 15.0729 11.9105L13.9445 11.7509C13.3161 11.6619 12.7382 12.082 12.6285 12.707L12.4317 13.8294C12.4104 13.9505 12.3359 14.053 12.2274 14.1107L11.2207 14.6448C10.6601 14.9422 10.4394 15.6217 10.718 16.1918L11.2185 17.2156C11.2725 17.3261 11.2725 17.4528 11.2185 17.5633L10.718 18.5871C10.4393 19.1572 10.6601 19.8367 11.2206 20.1341L12.2273 20.6682C12.3359 20.7258 12.4104 20.8284 12.4317 20.9494L12.6285 22.0719C12.7284 22.6409 13.2162 23.0399 13.7769 23.0399C13.8321 23.0399 13.8882 23.036 13.9445 23.028L15.0729 22.8684C15.1946 22.8511 15.3151 22.8904 15.4035 22.9758L16.2226 23.7682C16.4506 23.9888 16.7432 24.0991 17.0358 24.0991C17.3284 24.0991 17.6211 23.9888 17.8491 23.7682L18.6682 22.9758C18.7566 22.8904 18.877 22.8513 18.9988 22.8684L20.1272 23.028C20.7556 23.1169 21.3335 22.6969 21.4431 22.0719L21.64 20.9494C21.6613 20.8284 21.7357 20.7259 21.8443 20.6682L22.851 20.1341C23.4115 19.8367 23.6323 19.1572 23.3537 18.5871L22.8532 17.5632ZM15.4879 13.9065C16.2703 13.9065 16.9068 14.5431 16.9068 15.3255C16.9068 16.1079 16.2703 16.7445 15.4879 16.7445C14.7055 16.7445 14.0689 16.1079 14.0689 15.3255C14.0689 14.5431 14.7055 13.9065 15.4879 13.9065ZM14.7555 20.217C14.6799 20.2926 14.5809 20.3304 14.4818 20.3304C14.3828 20.3304 14.2838 20.2926 14.2082 20.217C14.0571 20.0659 14.0571 19.8208 14.2082 19.6697L19.3162 14.5618C19.4673 14.4107 19.7123 14.4107 19.8634 14.5618C20.0146 14.7129 20.0146 14.9579 19.8634 15.1091L14.7555 20.217ZM18.5837 20.8723C17.8013 20.8723 17.1648 20.2357 17.1648 19.4533C17.1648 18.6709 17.8013 18.0344 18.5837 18.0344C19.3661 18.0344 20.0027 18.6709 20.0027 19.4533C20.0027 20.2357 19.3661 20.8723 18.5837 20.8723Z"
            fill="url(#paint0_linear_2051_43641)"
          />
          <path
            d="M18.5859 18.8086C18.2303 18.8086 17.9409 19.0979 17.9409 19.4536C17.9409 19.8092 18.2302 20.0985 18.5859 20.0985C18.9415 20.0985 19.2309 19.8092 19.2309 19.4536C19.2309 19.0979 18.9415 18.8086 18.5859 18.8086Z"
            fill="url(#paint1_linear_2051_43641)"
          />
          <path
            d="M15.4975 14.6807C15.1419 14.6807 14.8525 14.97 14.8525 15.3256C14.8525 15.6813 15.1419 15.9706 15.4975 15.9706C15.8531 15.9706 16.1425 15.6813 16.1425 15.3256C16.1425 14.97 15.8531 14.6807 15.4975 14.6807Z"
            fill="url(#paint2_linear_2051_43641)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_2051_43641"
              x1="8.18585"
              y1="17.3911"
              x2="22.4364"
              y2="17.3911"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#B503FE" />
              <stop offset="1" stop-color="#FF376F" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_2051_43641"
              x1="17.6993"
              y1="19.4537"
              x2="19.1269"
              y2="19.4537"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#B503FE" />
              <stop offset="1" stop-color="#FF376F" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_2051_43641"
              x1="14.6109"
              y1="15.3258"
              x2="16.0385"
              y2="15.3258"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#B503FE" />
              <stop offset="1" stop-color="#FF376F" />
            </linearGradient>
          </defs>
        </svg> */}
        <Image src={icon} alt={alt} />
        <div className="ml-2 space-y-1">
          <h3 className="text-xl text-white font-semibold ">{title}</h3>
          <span className="text-xs text-white  ">{subTitle}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-xl font-medium text-white">{id}</span>
          <span className="text-white ml-[10px]">{salePercent}</span>
        </div>
        <canvas id={id} className="max-w-[78px] max-h-[50px]" />
      </div>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="9"
            viewBox="0 0 7 9"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M1.02249 3.85536L2.29481 2.15695L3.69869 0.282911C3.72949 0.241789 3.76944 0.208408 3.81538 0.185416C3.86132 0.162424 3.91199 0.150453 3.96336 0.150453C4.01474 0.150453 4.0654 0.162424 4.11135 0.185416C4.15729 0.208408 4.19724 0.241789 4.22803 0.282911L5.63184 2.15695L6.90416 3.85536C6.94098 3.90449 6.96339 3.96291 6.96889 4.02406C6.97438 4.08521 6.96274 4.14669 6.93527 4.2016C6.9078 4.25651 6.86558 4.30269 6.81335 4.33496C6.76112 4.36723 6.70093 4.38433 6.63953 4.38432L5.29807 4.38432L5.29807 8.15918L2.62858 8.15918L2.62858 4.38432L1.28712 4.38432C1.22571 4.38434 1.16552 4.36725 1.11328 4.33498C1.06104 4.30271 1.01881 4.25653 0.991341 4.20162C0.963868 4.1467 0.95223 4.08522 0.957731 4.02406C0.963231 3.96291 0.985654 3.90449 1.02249 3.85536Z"
              fill="white"
            />
          </svg>
          <span className="ml-[3px] text-white font-medium text-xs">
            {open}
          </span>
        </div>
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="9"
            viewBox="0 0 7 9"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M6.0089 4.45715L4.7259 6.16982L3.31022 8.05959C3.27917 8.10106 3.23888 8.13472 3.19255 8.1579C3.14623 8.18109 3.09514 8.19316 3.04333 8.19316C2.99152 8.19316 2.94043 8.18109 2.8941 8.1579C2.84778 8.13472 2.80749 8.10106 2.77644 8.05959L1.36084 6.16982L0.0778375 4.45715C0.0407092 4.4076 0.018109 4.34869 0.0125684 4.28703C0.00702785 4.22536 0.0187657 4.16337 0.0464673 4.108C0.0741688 4.05263 0.11674 4.00606 0.169412 3.97352C0.222084 3.94097 0.282776 3.92374 0.344691 3.92374H1.69741L1.69741 0.117187L4.38932 0.117187L4.38932 3.92374L5.74205 3.92374C5.80397 3.92372 5.86467 3.94095 5.91735 3.97349C5.97003 4.00604 6.0126 4.0526 6.04031 4.10798C6.06801 4.16336 6.07975 4.22535 6.0742 4.28702C6.06865 4.34869 6.04604 4.4076 6.0089 4.45715Z"
              fill="white"
            />
          </svg>
          <span className="ml-[3px] text-white font-medium text-xs">
            {closed}
          </span>
        </div>
        <span className="ml-[3px] text-white font-medium text-xs">
          {expired}
        </span>
      </div>
    </div>
  );
};

export default DashboardCard;
