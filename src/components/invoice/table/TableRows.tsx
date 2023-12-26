import { InvoiceTableRowTypes } from "@/types/invoice";
import React from "react";
import { useRouter } from "next/router";
import { getInvoiceStatusColor } from "@/utils/utility";
const TableRows = ({
  dataToAdd,
  handleNotes,
}: {
  dataToAdd: InvoiceTableRowTypes[];
  handleNotes: (item: string, e?: React.MouseEvent<HTMLSpanElement>) => void;
}) => {
  const router = useRouter();
  return (
    <div>
      {dataToAdd?.map((item, index: number) => {
        return (
          <div
            key={index}
            className="hover:bg-[#E9E1FF] bg-white px-6 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(90px,_90px)_minmax(200px,_200px)_minmax(200px,_100%)_minmax(150px,_150px)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(90px,_90px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(80px,_80px)_minmax(130px,_100%)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(80px,_80px),minmax(110px,_110px)_minmax(130px,_100%)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(80px,_80px),minmax(100px,_100%)_minmax(150px,_100%)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] mt-2 rounded-md"
          >
            <span className="py-4 flex items-center">{item.invoiceNumber}</span>
            <span className="py-4 flex items-center mlg:hidden xlg:flex">
              {item.contractID?.offerID?.leadID?.customerDetail?.fullName}
            </span>
            <span className="break-all py-4 flex items-center">
              {item.contractID?.offerID?.title}
            </span>
            <span className="py-4 flex items-center">
              {item.contractID?.offerID?.total}
            </span>

            <span className="py-4 flex justify-center items-center">
              <div
                className={`${
                  item.sentEmail === item.totalEmail
                    ? "bg-[#FE9244]"
                    : "bg-[#4A13E7]"
                } text-white px-2 py-1 text-center rounded-md w-fit text-sm`}
              >
                {item.sentEmail + "/" + item.totalEmail + " Sent"}
              </div>
            </span>
            <span className="py-4 flex justify-center items-center">
              <div className="flex rounded-md w-fit">
                <div
                  className={`${
                    parseInt(item.paidAmount) > parseInt(item.totalPrice)
                      ? "w-2/3"
                      : "w-1/3"
                  } bg-[#4A13E7] text-white pl-2 py-1 rounded-tl-md rounded-bl-md text-center text-sm w-full`}
                >
                  {item.paidAmount}
                </div>
                <div
                  className={`${
                    parseInt(item.paidAmount) <= parseInt(item.totalEmail)
                      ? "w-2/3"
                      : "w-1/3"
                  } bg-[#EDE7FD] text-[#393939] pr-2 py-1 rounded-tr-md rounded-br-md text-center text-sm`}
                >
                  {item.remainingAmount}
                </div>
              </div>
            </span>

            <span className="py-4 flex justify-center items-center">
              <div
                className={`bg-[${getInvoiceStatusColor(
                  item.invoiceStatus
                )}] text-white px-2 py-1 text-center rounded-md w-full text-sm`}
              >
                {item.invoiceStatus}
              </div>
            </span>
            <span
              onClick={(e) => handleNotes(item?.id, e)}
              className="py-4 cursor-pointer flex justify-center items-center   "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="33"
                viewBox="0 0 34 33"
                fill="none"
              >
                <rect
                  x="1.36719"
                  y="0.69043"
                  width="31.1684"
                  height="31"
                  rx="7.5"
                  fill="white"
                  stroke="#C7C7C7"
                />
                <path
                  d="M15.4044 22.0518H12.1297C11.1072 22.0518 10.2753 21.2199 10.2753 20.1974V11.7908C10.2753 10.7683 11.1072 9.93645 12.1297 9.93645H20.5362C21.5588 9.93645 22.3906 10.7683 22.3906 11.7908V15.1624C22.3906 15.5038 22.6674 15.7805 23.0088 15.7805C23.3501 15.7805 23.6269 15.5038 23.6269 15.1624V11.7908C23.6269 10.0867 22.2405 8.7002 20.5362 8.7002H12.1297C10.4255 8.7002 9.03906 10.0867 9.03906 11.7908V20.1974C9.03906 21.9016 10.4255 23.288 12.1297 23.288H15.4044C15.7458 23.288 16.0225 23.0113 16.0225 22.6699C16.0225 22.3285 15.7458 22.0518 15.4044 22.0518Z"
                  fill="#4A13E7"
                />
                <path
                  d="M24.3194 17.3499C23.5963 16.6269 22.4199 16.6269 21.6969 17.3499L18.5623 20.4845C17.6484 21.3984 17.145 22.6136 17.145 23.9061C17.145 24.2475 17.4218 24.5243 17.7631 24.5243C19.0557 24.5243 20.2709 24.0209 21.1849 23.1069L24.3194 19.9724C25.0424 19.2494 25.0424 18.0729 24.3194 17.3499ZM23.4452 18.224C23.6863 18.4651 23.6863 18.8572 23.4452 19.0982L23.0081 19.5353L22.134 18.6611L22.5711 18.224C22.8121 17.983 23.2043 17.983 23.4452 18.224ZM20.3107 22.2328C19.7939 22.7495 19.1478 23.09 18.4454 23.2239C18.5793 22.5215 18.9198 21.8754 19.4365 21.3586L21.2598 19.5353L22.134 20.4095L20.3107 22.2328Z"
                  fill="#4A13E7"
                />
                <path
                  d="M13.2906 14.7004L11.6923 16.2988C11.4509 16.5402 11.4509 16.9316 11.6923 17.173C11.9337 17.4144 12.3251 17.4144 12.5665 17.173L14.1648 15.5746C14.4058 15.3336 14.7979 15.3336 15.0389 15.5746L18.192 18.7277C18.4334 18.9691 18.8248 18.9691 19.0662 18.7277C19.3075 18.4863 19.3075 18.0949 19.0662 17.8535L15.9131 14.7004C15.1901 13.9775 14.0137 13.9775 13.2906 14.7004Z"
                  fill="#4A13E7"
                />
                <path
                  d="M19.3026 14.8806C18.2801 14.8806 17.4482 14.0488 17.4482 13.0263C17.4482 12.0038 18.2801 11.1719 19.3026 11.1719C20.3251 11.1719 21.157 12.0038 21.157 13.0263C21.157 14.0488 20.3251 14.8806 19.3026 14.8806ZM19.3026 12.4081C18.9618 12.4081 18.6845 12.6854 18.6845 13.0263C18.6845 13.3671 18.9618 13.6444 19.3026 13.6444C19.6435 13.6444 19.9208 13.3671 19.9208 13.0263C19.9208 12.6854 19.6435 12.4081 19.3026 12.4081Z"
                  fill="#4A13E7"
                />
              </svg>
            </span>
            <span
              className="py-4 cursor-pointer flex justify-center items-center"
              onClick={() =>
                router.push({
                  pathname: "/invoices/details",
                  query: { invoice: item.id },
                })
              }
            >
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

export default TableRows;
