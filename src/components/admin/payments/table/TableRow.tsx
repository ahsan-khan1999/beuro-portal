import { PaymentsAdmin } from "@/types/admin/payments";
import { useRouter } from "next/router";
import React from "react";

const TableRow = ({
  currentPageRows,
}: {
  currentPageRows: PaymentsAdmin[];
}) => {
  return (
    <div>
      {currentPageRows?.map((item, index) => {
        return (
          <div
            key={index}
            className="shadow-tableRow grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(115px,_100%)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md ">{item.id}</span>
            <span className="px-6 py-4 bg-white">{item.companyName}</span>
            <span className="px-6 py-4 bg-white ">{item.ownerName}</span>
            <span className="px-6 py-4 bg-white ">{item.plans}</span>
            <span className="px-6 py-4 bg-white ">{item.pricing}</span>
            <span className="px-6 py-4 bg-white ">{item.payments}</span>
            <span className="px-6 py-4 bg-white  ">
              {item.subscriptionAt?.toLocaleDateString()}
            </span>
            <span className="px-6 py-4 bg-white ">
              <div
                className={`${
                  item.status.includes("Active")
                    ? "bg-[#4A13E7]"
                    : item.status.includes("On Trail")
                    ? "bg-[#FE9244]"
                    : "bg-[#FF0000]"
                } text-white px-2 py-1 text-center rounded-md  w-[90px] text-sm`}
              >
                {item.status}
              </div>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
