import { SupportRequestAdmin } from "@/types/admin/support-request";
import React from "react";

const TableRow = ({
  currentPageRows,
}: {
  currentPageRows: SupportRequestAdmin[];
}) => {
  return (
    <div>
      {currentPageRows?.map((item, index) => {
        return (
          <div
            key={index}
            className="shadow-tableRow grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_200px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md ">{item.id}</span>
            <span className="px-6 py-4 bg-white">{item.customerName}</span>
            <span className="px-6 py-4 bg-white ">{item.email}</span>
            <span className="px-6 py-4 bg-white ">{item.phoneNumber}</span>
            <span className="px-6 py-4 bg-white ">
              {item.requestDate?.toLocaleDateString()}
            </span>
            <span className="px-6 py-4 bg-white ">
              <div
                className={`${
                  item.status.includes("Solved")
                    ? "bg-[#4A13E7]"
                    : "bg-[#FE9244]"
                } text-white px-2 py-1 text-center rounded-md  w-[90px] text-sm`}
              >
                {item.status}
              </div>
            </span>
            <span className="px-6 py-4 bg-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="none"
              >
                <path
                  d="M0.791257 14.585C0.620849 14.4021 0.535645 14.1854 0.535645 13.9351C0.535645 13.6848 0.620849 13.4685 0.791257 13.286L5.78422 7.92521L0.774216 2.54613C0.615168 2.37536 0.535645 2.16191 0.535645 1.90576C0.535645 1.64962 0.620849 1.43006 0.791257 1.2471C0.961665 1.06414 1.16343 0.972656 1.39655 0.972656C1.62967 0.972656 1.8312 1.06414 2.00116 1.2471L7.72688 7.41291C7.79504 7.4861 7.84344 7.56538 7.87206 7.65076C7.90069 7.73615 7.91478 7.82763 7.91433 7.92521C7.91433 8.02279 7.90001 8.11427 7.87138 8.19965C7.84275 8.28503 7.79459 8.36432 7.72688 8.4375L1.98412 14.6033C1.82507 14.7741 1.62898 14.8595 1.39587 14.8595C1.16275 14.8595 0.961211 14.768 0.791257 14.585Z"
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
