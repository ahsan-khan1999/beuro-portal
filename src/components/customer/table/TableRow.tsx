import { CustomerTable } from "@/types/customer";
import { formatDateTimeToDate } from "@/utils/utility";
import { useRouter } from "next/router";
import React from "react";

const TableRow = ({ currentPageRows }: CustomerTable) => {
  const router = useRouter();
  return (
    <>
      {currentPageRows?.map((item, index) => {
        return (
          <div
            onClick={() =>
              router.push({
                pathname: "/customers/details",
                query: { customer: item.id },
              })
            }
            key={index}
            className="hover:bg-[#E9E1FF] bg-white cursor-pointer px-6 shadow-tableRow grid gap-x-4 xs:w-fit mlg:w-full xs:grid-cols-[minmax(50px,_50px),minmax(150px,_150px)_minmax(300px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(50px,_50px),minmax(90px,_90px)_minmax(150px,_100%)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(90px,_90px)_minmax(40px,_40px)] xlg:grid-cols-[minmax(50px,_50px),minmax(90px,_90px)_minmax(190px,_100%)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(80px,_80px)_minmax(90px,_90px)_minmax(40px,_40px)] maxSize:grid-cols-[minmax(50px,_50px),minmax(110px,_110px)_minmax(150px,_100%)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(40px,_40px)] xMaxSize:grid-cols-[minmax(50px,_50px),minmax(150px,_150px)_minmax(180px,_100%)_minmax(140px,_100%)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(40px,_40px)] mt-2  rounded-md"
          >
            <span className="py-4 rounded-md flex items-center">
              {item.refID}
            </span>
            <span className="py-4 flex items-center">{item.fullName}</span>

            <span className="py-4 flex items-center break-all">
              {item.email}
            </span>
            <span className="py-4 flex items-center break-all">
              {item.phoneNumber}
            </span>
            <span className="py-4 xlg:flex items-center mlg:hidden ">
              {formatDateTimeToDate(item.createdAt)}
            </span>
            <span className="py-4 flex items-center">
              {item.address.country}
            </span>
            <span className="py-4 flex items-center"> {item.customerType}</span>
            <span className="flex justify-center items-center">
              <div className="p-[5px] rounded-md border border-[#8F8F8F] border-opacity-10 w-[27px] h-[27px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="none"
                >
                  <path
                    d="M0.461667 14.0074C0.291259 13.8244 0.206055 13.6078 0.206055 13.3575C0.206055 13.1072 0.291259 12.8908 0.461667 12.7084L5.45463 7.34757L0.444626 1.96849C0.285579 1.79773 0.206055 1.58427 0.206055 1.32813C0.206055 1.07198 0.291259 0.852424 0.461667 0.669462C0.632076 0.4865 0.833839 0.39502 1.06696 0.39502C1.30008 0.39502 1.50161 0.4865 1.67157 0.669462L7.39729 6.83528C7.46545 6.90846 7.51385 6.98775 7.54247 7.07313C7.5711 7.15851 7.58519 7.24999 7.58474 7.34757C7.58474 7.44515 7.57042 7.53663 7.54179 7.62201C7.51316 7.7074 7.465 7.78668 7.39729 7.85986L1.65453 14.0257C1.49548 14.1964 1.29939 14.2818 1.06628 14.2818C0.833157 14.2818 0.631621 14.1903 0.461667 14.0074Z"
                    fill="black"
                  />
                </svg>
              </div>
            </span>
          </div>
        );
      })}
    </>
  );
};

export default TableRow;
