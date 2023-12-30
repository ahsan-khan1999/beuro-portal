import { TableRowEmailTracker } from "@/types/emailTracker";
import { useRouter } from "next/router";
import React from "react";
import { formatDateTimeToDate, formatDateTimeToTime } from "@/utils/utility";

const TableRow = ({ dataToAdd }: { dataToAdd: TableRowEmailTracker[] }) => {
  const router = useRouter();

  return (
    <div>
      {dataToAdd?.map((item, index: number) => {

        return (
          <div
            onClick={() =>
              router.push({
                pathname: "/email-tracker/view-mail",
                query: { email: item.id },
              })
            }
            key={item.id}
            className="hover:bg-[#E9E1FF] px-6 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(150px,_150px)_minmax(240px,_100%)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(100px,_100px),minmax(130px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(100px,_100px),minmax(130px,_100%)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(90px,_90px),minmax(130px,_100%)_minmax(160px,_100%)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] mt-2 bg-white rounded-md"
          >
            <span className="py-4 flex items-center">
              {item?.id && item.id.slice(-5)}
            </span>
            <span className="py-4 flex items-center">{item.recipient}</span>
            <span className="break-ll xs:block mlg:hidden xlg:hidden maxSize:flex py-4 items-center">
              {item.subject}
            </span>
            <div className="py-4 flex flex-col ">
              <span>{formatDateTimeToTime(item.createdAt)}</span>
              <span>{formatDateTimeToDate(item.createdAt)}</span>
            </div>
            <div className="py-4 flex flex-col ">
              {(item.viewedAt && (
                <>
                  <span>{formatDateTimeToTime(item.viewedAt)}</span>
                  <span>{formatDateTimeToDate(item.viewedAt)}</span>
                </>
              )) || <span className="flex my-auto align-middle">-</span>}
            </div>
            <span className="py-4 flex justify-center items-center">
              <div
                className={`bg-[${
                  item.mailStatus === "opend"
                    ? "#45C769"
                    : item.mailStatus === "pending"
                    ? "#FE9244"
                    : "#ff376f"
                }] text-white px-2 py-1 text-center rounded-md text-sm min-w-[70px]`}
              >
                {item.mailStatus}
              </div>
            </span>

            <span className="py-4  flex justify-center items-center">
              <span className="p-1 border border-[#f4f4f4] rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="29"
                  height="29"
                  viewBox="0 0 29 29"
                  fill="none"
                >
                  <path
                    opacity="0.1"
                    d="M1.12891 4.34055C1.12891 2.59917 2.54057 1.1875 4.28195 1.1875H24.7768C26.5181 1.1875 27.9298 2.59917 27.9298 4.34055V24.8354C27.9298 26.5767 26.5181 27.9884 24.7768 27.9884H4.28195C2.54057 27.9884 1.12891 26.5767 1.12891 24.8354V4.34055Z"
                    stroke="#8F8F8F"
                  />
                  <path
                    d="M14.4499 16.1375C15.3211 16.1375 16.0273 15.4299 16.0273 14.557C16.0273 13.6842 15.3211 12.9766 14.4499 12.9766C13.5788 12.9766 12.8726 13.6842 12.8726 14.557C12.8726 15.4299 13.5788 16.1375 14.4499 16.1375Z"
                    fill={item?.viewedAt ? "#45C769" : "#FF376F"}
                  />
                  <path
                    d="M6.66915 15.0562C7.70759 16.36 10.7966 19.837 14.4508 19.837C18.1051 19.837 21.1941 16.3602 22.2325 15.0562C22.4559 14.7664 22.4559 14.3581 22.2325 14.0817C21.1941 12.7778 18.1051 9.30082 14.4508 9.30082C10.7966 9.28765 7.70759 12.7646 6.66915 14.0685C6.43255 14.3583 6.43255 14.7664 6.66915 15.0562ZM14.4508 11.3949C16.1991 11.3949 17.6056 12.8041 17.6056 14.5558C17.6056 16.3075 16.1991 17.7167 14.4508 17.7167C12.7026 17.7167 11.2961 16.3075 11.2961 14.5558C11.2961 12.8041 12.7026 11.3949 14.4508 11.3949Z"
                    fill={item?.viewedAt ? "#45C769" : "#FF376F"}
                  />
                </svg>
              </span>
            </span>

            <span className="py-4 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="none"
              >
                <path
                  d="M0.461667 14.0655C0.291259 13.8825 0.206055 13.6659 0.206055 13.4156C0.206055 13.1653 0.291259 12.9489 0.461667 12.7665L5.45463 7.40568L0.444626 2.0266C0.285579 1.85583 0.206055 1.64238 0.206055 1.38623C0.206055 1.13008 0.291259 0.91053 0.461667 0.727568C0.632076 0.544606 0.833839 0.453125 1.06696 0.453125C1.30008 0.453125 1.50161 0.544606 1.67157 0.727568L7.39729 6.89338C7.46545 6.96657 7.51385 7.04585 7.54247 7.13123C7.5711 7.21662 7.58519 7.3081 7.58474 7.40568C7.58474 7.50326 7.57042 7.59474 7.54179 7.68012C7.51316 7.7655 7.465 7.84478 7.39729 7.91797L1.65453 14.0838C1.49548 14.2545 1.29939 14.3399 1.06628 14.3399C0.833157 14.3399 0.631621 14.2485 0.461667 14.0655Z"
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
