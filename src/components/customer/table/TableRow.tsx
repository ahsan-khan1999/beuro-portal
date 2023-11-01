import { CustomerTable } from "@/types/customer";
import { useRouter } from "next/router";
import React from "react";

const TableRow = ({ currentPageRows }: CustomerTable) => {
  const router = useRouter()
  return (
    <div>
      {currentPageRows?.map((item, index) => {
        return (
          <div
            key={index}
            className="shadow-tableRow grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(70px,_150px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md ">{item.id}</span>
            <span className="px-6 py-4 bg-white  ">{item.name}</span>
            <span className="px-6 py-4 bg-white ">{item.email}</span>
            <span className="px-6 py-4 bg-white ">{item.phone}</span>
            <span className="px-6 py-4 bg-white ">
             {item.date}
            </span>
            <span className="px-6 py-4 bg-white ">{item.location}</span>
            <span className="px-6 py-4 bg-white "> {item.customerType}</span>
            <span className="px-6 py-4 bg-white ">
              <div
                onClick={() => router.push({ pathname: "/customers/details", query: { customer: item.id } })}
                className="p-[6px] border border-[#8F8F8F] border-opacity-10 rounded-md w-fit cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11.7644 3.29533C12.1737 2.91021 12.7196 2.70117 13.28 2.70117C13.8403 2.70117 14.3862 2.91021 14.7955 3.29533L14.7956 3.2954L14.9174 3.41007L14.9175 3.41015C15.3282 3.79684 15.5682 4.33129 15.5682 4.89889C15.5682 5.46649 15.3282 6.00094 14.9175 6.38763L14.9174 6.3877L13.7979 7.4414C13.795 7.44417 13.792 7.44692 13.7891 7.44964L6.71065 14.1117C6.61471 14.202 6.49667 14.2654 6.36841 14.2956L3.53508 14.9623C3.27853 15.0226 3.00913 14.9439 2.82545 14.7549C2.64177 14.5659 2.57077 14.2944 2.63843 14.0397L3.34677 11.373C3.38269 11.2378 3.45572 11.1153 3.55761 11.0194L10.637 4.3564C10.64 4.35361 10.6429 4.35084 10.6459 4.34811L11.7644 3.2954L11.7644 3.29533ZM11.155 5.92882L4.74154 11.965L4.40934 13.2156L5.82907 12.8816L12.1857 6.89889L11.155 5.92882ZM13.28 5.86895L12.2493 4.89889L12.7923 4.38778C12.7923 4.38776 12.7924 4.38773 12.7924 4.3877C12.9144 4.27294 13.0891 4.20117 13.28 4.20117C13.4709 4.20117 13.6455 4.27294 13.7675 4.3877C13.7676 4.38773 13.7676 4.38776 13.7676 4.38778L13.8893 4.50229C14.0097 4.61568 14.0682 4.75938 14.0682 4.89889C14.0682 5.03836 14.0097 5.18203 13.8894 5.2954C13.8893 5.29543 13.8893 5.29546 13.8893 5.29548L13.28 5.86895ZM8.9883 14.2322C8.9883 13.818 9.32408 13.4822 9.7383 13.4822H15.405C15.8192 13.4822 16.155 13.818 16.155 14.2322C16.155 14.6464 15.8192 14.9822 15.405 14.9822H9.7383C9.32408 14.9822 8.9883 14.6464 8.9883 14.2322Z"
                    fill="#4A13E7"
                  />
                </svg>
              </div>
            </span>

            <span className="px-6 py-4 flex justify-center items-center bg-white rounded-md">
              <svg
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="none"
              >
                <path
                  d="M0.332761 13.773C0.162353 13.59 0.0771484 13.3734 0.0771484 13.1231C0.0771484 12.8728 0.162353 12.6565 0.332761 12.474L5.32573 7.1132L0.31572 1.73412C0.156672 1.56335 0.0771484 1.3499 0.0771484 1.09375C0.0771484 0.837604 0.162353 0.618049 0.332761 0.435087C0.503169 0.252125 0.704933 0.160645 0.938051 0.160645C1.17117 0.160645 1.37271 0.252125 1.54266 0.435087L7.26838 6.6009C7.33654 6.67409 7.38494 6.75337 7.41357 6.83875C7.4422 6.92413 7.45628 7.01562 7.45583 7.1132C7.45583 7.21077 7.44152 7.30226 7.41289 7.38764C7.38426 7.47302 7.33609 7.5523 7.26838 7.62549L1.52562 13.7913C1.36657 13.9621 1.17049 14.0475 0.937369 14.0475C0.704251 14.0475 0.502715 13.956 0.332761 13.773Z"
                  fill="black"
                />
              </svg>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
