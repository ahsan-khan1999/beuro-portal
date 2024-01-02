import { PaymentsAdmin } from "@/types/admin/payments";
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
            className="px-5 hover:bg-[#E9E1FF] bg-white cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(60px,_60px),minmax(200px,_100%)_minmax(170px,_100%)_minmax(150px,_150px)_minmax(120px,_100%)_minmax(120px,_120px)_minmax(150px,_150px)_minmax(100px,_100px)] mlg:grid-cols-[minmax(60px,_60px),minmax(130px,_100%)_minmax(90px,_90px)_minmax(80px,_80px)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(90px,_90px)] xlg:grid-cols-[minmax(60px,_60px),minmax(140px,_100%)_minmax(140px,_140px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(90px,_90px)] maxSize:grid-cols-[minmax(60px,_60px),minmax(150px,_100%)_minmax(170px,_170px)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(90px,_90px)] xMaxSize:grid-cols-[minmax(60px,_60px),minmax(160px,_100%)_minmax(140px,_100%)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(90px,_90px)] mt-2  rounded-md"
          >
            <span className="py-4  rounded-md ">{item.id}</span>
            <span className="py-4  xs:block mlg:hidden xlg:block maxSize:block">
              {item.companyName}
            </span>
            <span className="py-4  ">{item.ownerName}</span>
            <span className="py-4  ">{item.plans}</span>
            <span className="py-4  ">{item.pricing}</span>
            <span className="py-4  ">{item.payments}</span>
            <span className="py-4   ">
              {item.subscriptionAt?.toLocaleDateString()}
            </span>
            <span className="py-4  ">
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
