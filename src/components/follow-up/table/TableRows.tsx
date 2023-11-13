import React from "react";
import { FollowUpsTable } from "@/types/follow-up";

const TableRows = ({ currentPageRows }: FollowUpsTable) => {
  console.log(currentPageRows);

  return (
    <div>
      {currentPageRows?.map((item: any, index: number) => {
        return (
          <div
            key={index}
            className="border border-[#4A13E7] cursor-pointer shadow-tableRow grid grid-cols-[minmax(70px,_70px)_minmax(180px,_180px)_minmax(250px,_250px)_minmax(300px,_300px)_minmax(150px,_150px)_minmax(80px,_100%)_minmax(100px,_100px)] mt-2 bg-white rounded-md p-4"
          >
            <span className=" bg-white rounded-md flex items-center ">
              {item.id}
            </span>
            <span className=" bg-white  flex items-center">
              {item.customerName}
            </span>
            <span className=" bg-white flex items-center">
              {item.dateAndTime}
            </span>
            <span className=" bg-white flex items-center">{item.title}</span>

            <span className=" bg-white flex items-center justify-center">
              <div
                className={`${
                  item.status.includes("Overdue")
                    ? "bg-[#FF376F]"
                    : item.status.includes("Pending")
                    ? "bg-[#FE9244]"
                    : "bg-[#4A13E7]"
                } text-white px-2 py-1 text-center rounded-md  text-sm `}
              >
                {item.status}
              </div>
            </span>
            <span className=" flex justify-center items-center  bg-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  opacity="0.1"
                  d="M0.892578 4.28928C0.892578 2.5479 2.30425 1.13623 4.04563 1.13623H24.5404C26.2818 1.13623 27.6935 2.5479 27.6935 4.28928V24.7841C27.6935 26.5255 26.2818 27.9371 24.5404 27.9371H4.04563C2.30425 27.9371 0.892578 26.5255 0.892578 24.7841V4.28928Z"
                  stroke="#8F8F8F"
                />
                <path
                  d="M14.2136 16.0847C15.0848 16.0847 15.791 15.3771 15.791 14.5043C15.791 13.6314 15.0848 12.9238 14.2136 12.9238C13.3424 12.9238 12.6362 13.6314 12.6362 14.5043C12.6362 15.3771 13.3424 16.0847 14.2136 16.0847Z"
                  fill="#FF376F"
                />
                <path
                  d="M6.43283 15.0046C7.47126 16.3085 10.5603 19.7855 14.2145 19.7855C17.8687 19.7855 20.9578 16.3086 21.9962 15.0046C22.2195 14.7149 22.2195 14.3066 21.9962 14.0302C20.9578 12.7263 17.8687 9.2493 14.2145 9.2493C10.5603 9.23613 7.47126 12.7131 6.43283 14.017C6.19622 14.3067 6.19622 14.7149 6.43283 15.0046ZM14.2145 11.3434C15.9628 11.3434 17.3692 12.7526 17.3692 14.5043C17.3692 16.256 15.9628 17.6652 14.2145 17.6652C12.4663 17.6652 11.0598 16.256 11.0598 14.5043C11.0598 12.7526 12.4663 11.3434 14.2145 11.3434Z"
                  fill="#FF376F"
                />
              </svg>
            </span>
            <span className=" flex justify-center items-center bg-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
              >
                <path
                  opacity="0.1"
                  d="M0.892578 4.28928C0.892578 2.5479 2.30425 1.13623 4.04563 1.13623H24.5404C26.2818 1.13623 27.6935 2.5479 27.6935 4.28928V24.7841C27.6935 26.5255 26.2818 27.9371 24.5404 27.9371H4.04563C2.30425 27.9371 0.892578 26.5255 0.892578 24.7841V4.28928Z"
                  stroke="#8F8F8F"
                />
                <path
                  d="M14.2136 16.0847C15.0848 16.0847 15.791 15.3771 15.791 14.5043C15.791 13.6314 15.0848 12.9238 14.2136 12.9238C13.3424 12.9238 12.6362 13.6314 12.6362 14.5043C12.6362 15.3771 13.3424 16.0847 14.2136 16.0847Z"
                  fill="#FF376F"
                />
                <path
                  d="M6.43283 15.0046C7.47126 16.3085 10.5603 19.7855 14.2145 19.7855C17.8687 19.7855 20.9578 16.3086 21.9962 15.0046C22.2195 14.7149 22.2195 14.3066 21.9962 14.0302C20.9578 12.7263 17.8687 9.2493 14.2145 9.2493C10.5603 9.23613 7.47126 12.7131 6.43283 14.017C6.19622 14.3067 6.19622 14.7149 6.43283 15.0046ZM14.2145 11.3434C15.9628 11.3434 17.3692 12.7526 17.3692 14.5043C17.3692 16.256 15.9628 17.6652 14.2145 17.6652C12.4663 17.6652 11.0598 16.256 11.0598 14.5043C11.0598 12.7526 12.4663 11.3434 14.2145 11.3434Z"
                  fill="#FF376F"
                />
              </svg>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
