import React from "react";
import { FollowUps, FollowUpsTable } from "@/types/follow-up";
import { StatusColors } from "@/enums/follow-up";
import { formatDate } from "@/utils/utility";

const TableRows = ({
  currentPageRows,
  handleFollowUpsDetails,
  handleFollowUpsDelete,
}: FollowUpsTable) => {
  return (
    <div>
      {currentPageRows?.map((item: FollowUps, index: number) => {
        return (
          <div className="flex">
            <div className="mlg:w-full">
              <div
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                } gap-x-3 rounded-md hover:bg-[#E9E1FF] pl-4 pr-1 border-t border-t-[#E7EAEE] grid grid-cols-[minmax(70px,_70px)_minmax(180px,_180px)_minmax(250px,_250px)_minmax(150px,_100%)_minmax(100px,_100px)]`}
              >
                <span className="py-4 flex items-center">
                  {item.customer?.refID}
                </span>
                <span className="py-4 flex items-center truncate mr-2">
                  {item?.customer?.fullName}
                </span>
                <span className="py-4 lex items-center">
                  {item?.dateTime && formatDate(item?.dateTime)}
                </span>
                <span className="py-4 flex items-center">{item?.title}</span>

                <div className="py-4">
                  <div
                    className={`bg-[${
                      StatusColors[item?.status]
                    }] text-white px-2 py-1 text-center rounded-md text-sm min-w-[70px] w-full`}
                  >
                    {item?.status}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-[minmax(50px,_50px),minmax(50px,_50px)]">
              <span
                className="py-4 flex justify-center items-center cursor-pointer"
                onClick={() => handleFollowUpsDelete(item?.id)}
              >
                <svg
                  width="13"
                  height="15"
                  viewBox="0 0 13 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.20059 1.93699H10.6988H10.6989C11.3492 1.93713 11.8966 2.42616 11.9805 3.07732L11.9805 3.07735C12.0608 3.7025 11.6904 4.29409 11.1048 4.48994V12.2172C11.1048 12.7019 10.9297 13.1599 10.62 13.4904C10.62 13.4904 10.6199 13.4904 10.6199 13.4905L10.5469 13.4221L9.20059 1.93699ZM9.20059 1.93699V1.64138V1.64118V1.93699ZM5.09285 0.290422H5.09245V0.390422L5.09285 0.290422ZM5.09285 0.290422H7.86396H5.09285ZM1.85203 12.2172C1.85203 12.7019 2.02716 13.1599 2.33682 13.4903L3.75623 1.64118V1.64147V1.93699H2.25797H2.25795C1.60762 1.93713 1.06018 2.42616 0.976347 3.07732L0.976344 3.07735C0.896001 3.7025 1.26639 4.29409 1.85203 4.48994V12.2172ZM4.58056 1.64118H4.58057L4.58055 1.63992C4.57881 1.50165 4.63241 1.36883 4.72876 1.27161L4.7288 1.27157C4.82493 1.17447 4.95549 1.12134 5.0907 1.1237L5.0907 1.12372H5.09245H7.86437V1.12373L7.86612 1.1237C8.00133 1.12134 8.13189 1.17447 8.22802 1.27157L8.22809 1.27165C8.32439 1.3687 8.37801 1.50162 8.37627 1.63993L8.37626 1.63992V1.64118V1.93699H4.58056V1.64118ZM8.32002 5.18907C8.09103 5.18907 7.90785 5.37694 7.90785 5.60572V11.5904C7.90785 11.819 8.091 12.007 8.32002 12.007C8.54903 12.007 8.73218 11.819 8.73218 11.5904V5.60572C8.73218 5.37694 8.54901 5.18907 8.32002 5.18907ZM4.63663 5.18907C4.40764 5.18907 4.22446 5.37694 4.22446 5.60572V11.5904C4.22446 11.819 4.40761 12.007 4.63663 12.007C4.86564 12.007 5.04879 11.819 5.04879 11.5904V5.60572C5.04879 5.37694 4.86562 5.18907 4.63663 5.18907ZM9.43153 13.178H3.52529C3.05703 13.178 2.67636 12.7685 2.67636 12.2172V4.54352H10.2805V12.2172C10.2805 12.7685 9.89979 13.178 9.43153 13.178ZM2.25797 2.77029H10.6988C10.9526 2.77029 11.1607 2.97934 11.1607 3.24025C11.1607 3.50117 10.9526 3.71022 10.6988 3.71022H2.25797C2.00421 3.71022 1.79608 3.50117 1.79608 3.24025C1.79608 2.97934 2.00421 2.77029 2.25797 2.77029ZM6.47811 5.18907C6.24912 5.18907 6.06594 5.37694 6.06594 5.60572V11.5904C6.06594 11.819 6.24909 12.007 6.47811 12.007C6.70712 12.007 6.89027 11.819 6.89027 11.5904V5.60572C6.89027 5.37694 6.7071 5.18907 6.47811 5.18907Z"
                    fill="#ED2F2F"
                    stroke="#ED2F2F"
                    stroke-width="0.2"
                  />
                </svg>
              </span>
              <span
                className="py-4 flex justify-center items-center cursor-pointer"
                onClick={() => handleFollowUpsDetails(item?.id)}
              >
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
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
