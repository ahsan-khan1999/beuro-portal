
import { TableRowEmailTracker } from "@/types/emailTracker";
import { useRouter } from "next/router";
import React from "react";

const TableRow = ({ dataToAdd }: { dataToAdd: TableRowEmailTracker[] }) => {
  const router = useRouter();
  return (
    <div>
      {dataToAdd?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="shadow-tableRow grid grid-cols-[minmax(70px,_70px),minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_100%)_minmax(200px,_200px)_minmax(150px,_150px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md ">{item.id}</span>
            <span className="px-6 py-4 bg-white  ">{item.recipient}</span>
            <span className="px-6 py-4 bg-white ">{item.subject}</span>
            <div className="px-6 py-4 bg-white  flex flex-col ">
              <span>{item.sendAt.time}</span>
              <span>{item.sendAt.date}</span>
            </div>
            <div className="px-6 py-4 bg-white  flex flex-col ">
              <span>{item.sendAt.time}</span>
              <span>{item.sendAt.date}</span>
            </div>
            <span className="px-6 py-4 bg-white flex justify-center items-center">
              <div
                className={`bg-[${item.status.colorClass}] text-white px-2 py-1 text-center rounded-md  w-[70px] text-sm`}
              >
                {item.status.text}
              </div>
            </span>

            <span className="px-6 py-4 bg-white flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                onClick={() => router.push("/email-tracker/view-mail")}
                className="cursor-pointer"
              >
                <path
                  opacity="0.1"
                  d="M1.02344 4.57492C1.02344 2.83354 2.43511 1.42188 4.17649 1.42188H24.6713C26.4127 1.42188 27.8243 2.83354 27.8243 4.57492V25.0697C27.8243 26.8111 26.4127 28.2228 24.6713 28.2228H4.17648C2.4351 28.2228 1.02344 26.8111 1.02344 25.0697V4.57492Z"
                  stroke="#8F8F8F"
                />
                <path
                  fill={item.status.colorClass}
                  d="M14.3469 16.3718C15.2181 16.3718 15.9243 15.6642 15.9243 14.7914C15.9243 13.9185 15.2181 13.2109 14.3469 13.2109C13.4757 13.2109 12.7695 13.9185 12.7695 14.7914C12.7695 15.6642 13.4757 16.3718 14.3469 16.3718Z"
                />
                <path
                  fill={item.status.colorClass}
                  d="M6.56417 15.2905C7.60261 16.5944 10.6916 20.0714 14.3459 20.0714C18.0001 20.0714 21.0891 16.5945 22.1275 15.2905C22.3509 15.0008 22.3509 14.5925 22.1275 14.3161C21.0891 13.0122 18.0001 9.53519 14.3459 9.53519C10.6916 9.52202 7.60261 12.999 6.56417 14.3029C6.32757 14.5926 6.32757 15.0008 6.56417 15.2905ZM14.3459 11.6293C16.0941 11.6293 17.5006 13.0385 17.5006 14.7902C17.5006 16.5419 16.0941 17.9511 14.3459 17.9511C12.5976 17.9511 11.1911 16.5419 11.1911 14.7902C11.1911 13.0385 12.5976 11.6293 14.3459 11.6293Z"
                />
              </svg>
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
