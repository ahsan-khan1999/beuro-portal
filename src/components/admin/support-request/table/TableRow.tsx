import { SupportRequestAdmin } from "@/types/admin/support-request";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import moreInfoIcon from "@/assets/svgs/entity_more_info.svg";

const TableRow = ({
  currentPageRows,
}: {
  currentPageRows: SupportRequestAdmin[];
}) => {
  const router = useRouter();
  return (
    <div>
      {currentPageRows?.map((item, index) => {
        return (
          <div
            onClick={() =>
              router.push({
                pathname: "/admin/support-request/details",
                query: { supportRequest: item.id },
              })
            }
            key={index}
            className="hover:bg-[#E9E1FF] bg-white px-5 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(240px,_100%)_minmax(170px,_170px)_minmax(140px,_140px)_minmax(100px,_100px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(60px,_60px),minmax(180px,_100%)_minmax(200px,_200px)_minmax(140px,_140px)_minmax(100px,_100px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(60px,_60px),minmax(150px,_100%)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(50px,_50px)]  mt-2  rounded-md"
          >
            <span className="py-4  rounded-md ">{item.id}</span>
            <span className="py-4 ">{item.customerName}</span>
            <span className="py-4  xs:block mlg:hidden xlg:block">
              {item.email}
            </span>
            <span className="py-4  ">{item.phoneNumber}</span>
            <span className="py-4  ">
              {item.requestDate?.toLocaleDateString()}
            </span>
            <span className="py-4  flex justify-center items-center">
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
            <span className="py-4  flex justify-center items-center">
              <Image src={moreInfoIcon} alt="moreInfoIcon" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRow;
