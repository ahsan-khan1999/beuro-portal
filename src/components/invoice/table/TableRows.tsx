import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { InvoiceTableRowTypes } from "@/types/invoice";
import { getInvoiceStatusColor } from "@/utils/utility";
const TableRows = ({
  dataToAdd,
  handleNotes,
}: {
  dataToAdd: InvoiceTableRowTypes[];
  handleNotes: (item: string, e?: React.MouseEvent<HTMLSpanElement>) => void;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();

  return (
    <div>
      {dataToAdd?.map((item, index: number) => {
        return (
          <div
            key={index}
            onClick={() =>
              router.push({
                pathname: "/invoices/details",
                query: { ...router.query, invoice: item.id },
              })
            }
            className="gap-x-3 hover:bg-[#E9E1FF] cursor-pointer items-center xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(90px,_90px)_minmax(200px,_5fr)_minmax(250px,_4fr)_minmax(150px,_150px)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(110px,_110px)_minmax(90px,_90px)_minmax(90px,_90px)] mlg:grid-cols-[minmax(70px,_70px)_minmax(100px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(50px,_50px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(70px,_70px),minmax(120px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(50px,_50px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(70px,_70px),minmax(100px,_4fr)_minmax(130px,_3fr)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)_minmax(50px,_50px)] xMaxSize:grid-cols-[minmax(70px,_70px),minmax(100px,_4fr)_minmax(130px,_3fr)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)_minmax(50px,_50px)] border-t border-t-[#E7EAEE]"
          >
            <span className="py-4 truncate">{item.invoiceNumber}</span>
            <span className="py-4 truncate">
              {item?.customerDetail?.fullName}
            </span>
            <span className="py-4 mlg:hidden maxSize:block truncate">
              {item?.title}
            </span>
            <span className="py-4 truncate mlg:hidden xMaxSize:block">
              {item?.total}
            </span>

            <span className="py-4 flex justify-center items-center">
              <div
                className={`${
                  item.sentEmail === item.totalEmail
                    ? "bg-[#FE9244]"
                    : "bg-[#4A13E7]"
                } text-white px-2 py-1 text-center rounded-md w-full text-sm`}
              >
                {item.sentEmail + "/" + item.totalEmail + " Sent"}
              </div>
            </span>
            <span className="py-4 flex justify-center items-center">
              <div className="flex justify-center items-center rounded-md w-full">
                <div
                  className={`bg-[#4A13E7] text-white px-2 py-1 rounded-tl-md rounded-bl-md text-center text-sm`}
                >
                  {!Number.isInteger(item?.paidAmount)
                    ? Number(item?.paidAmount)?.toFixed(2)
                    : item?.paidAmount}
                </div>
                <div
                  className={`bg-[#EDE7FD] text-[#393939] px-2 py-1 rounded-tr-md rounded-br-md text-center text-sm`}
                >
                  {!Number.isInteger(item?.remainingAmount)
                    ? Number(item?.remainingAmount)?.toFixed(2)
                    : item?.remainingAmount}
                </div>
              </div>
            </span>

            <span className="py-4 flex justify-center items-center">
              <div
                className={`bg-[${getInvoiceStatusColor(
                  item.invoiceStatus
                )}] text-white px-2 py-1 text-center rounded-md min-w-[70px] w-full text-sm`}
              >
                {translate(`invoice_status.${item.invoiceStatus}`)}
              </div>
            </span>
            <span
              onClick={(e) => handleNotes(item?.id, e)}
              className="py-4 cursor-pointer flex justify-center items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="33"
                viewBox="0 0 33 33"
                fill="none"
              >
                <rect
                  x="1.03711"
                  y="0.69043"
                  width="31.1684"
                  height="31"
                  rx="7.5"
                  fill="white"
                  stroke={item?.isNoteCreated ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M20.0838 15.499C20.0838 15.1576 19.8071 14.8809 19.4657 14.8809H13.0991C12.7577 14.8809 12.481 15.1576 12.481 15.499C12.481 15.8404 12.7577 16.1171 13.0991 16.1171H19.4657C19.8071 16.1171 20.0838 15.8404 20.0838 15.499Z"
                  fill={item?.isNoteCreated ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M13.0991 17.3535C12.7577 17.3535 12.481 17.6302 12.481 17.9716C12.481 18.313 12.7577 18.5897 13.0991 18.5897H16.9657C17.3071 18.5897 17.5838 18.313 17.5838 17.9716C17.5838 17.6302 17.3071 17.3535 16.9657 17.3535H13.0991Z"
                  fill={item?.isNoteCreated ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M14.5505 23.2877H12.4832C11.8015 23.2877 11.247 22.7332 11.247 22.0515V11.1727C11.247 10.491 11.8015 9.93643 12.4832 9.93643H20.0826C20.7643 9.93643 21.3188 10.491 21.3188 11.1727V14.9741C21.3188 15.3155 21.5956 15.5922 21.937 15.5922C22.2783 15.5922 22.5551 15.3155 22.5551 14.9741V11.1727C22.5551 9.80934 21.4459 8.7002 20.0826 8.7002H12.4832C11.1199 8.7002 10.0107 9.80934 10.0107 11.1727V22.0515C10.0107 23.4148 11.1199 24.524 12.4832 24.524H14.5505C14.8919 24.524 15.1686 24.2472 15.1686 23.9059C15.1686 23.5645 14.8919 23.2877 14.5505 23.2877Z"
                  fill={item?.isNoteCreated ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M23.6495 17.6498C22.9265 16.9267 21.7501 16.9267 21.0275 17.6493L17.634 21.0353C17.5619 21.1072 17.5087 21.1958 17.4791 21.2932L16.7401 23.7263C16.6746 23.942 16.7316 24.1762 16.8891 24.3376C17.007 24.4585 17.1672 24.5241 17.3316 24.5241C17.3865 24.5241 17.442 24.5167 17.4965 24.5016L19.9914 23.8105C20.0941 23.7821 20.1877 23.7276 20.2631 23.6523L23.6495 20.2722C24.3725 19.5492 24.3725 18.3728 23.6495 17.6498ZM19.5048 22.6626L18.2496 23.0102L18.6169 21.8009L20.9067 19.5162L21.781 20.3905L19.5048 22.6626ZM22.7758 19.3977L22.656 19.5172L21.7819 18.6431L21.9012 18.524C22.1422 18.283 22.5344 18.283 22.7754 18.524C23.0164 18.765 23.0164 19.1571 22.7758 19.3977Z"
                  fill={item?.isNoteCreated ? "#FF0000" : "#4A13E7"}
                />
                <path
                  d="M19.4657 12.4092H13.0991C12.7577 12.4092 12.481 12.6859 12.481 13.0273C12.481 13.3687 12.7577 13.6454 13.0991 13.6454H19.4657C19.8071 13.6454 20.0838 13.3687 20.0838 13.0273C20.0838 12.6859 19.8071 12.4092 19.4657 12.4092Z"
                  fill={item?.isNoteCreated ? "#FF0000" : "#4A13E7"}
                />
              </svg>
            </span>
            <span
              className="cursor-pointer flex justify-center items-center"
              onClick={() =>
                router.push({
                  pathname: "/invoices/details",
                  query: { ...router.query, invoice: item.id },
                })
              }
            >
              <div className="p-[5px] rounded-md w-[27px] h-[27px] border border-primary flex justify-center items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="8"
                  height="15"
                  viewBox="0 0 8 15"
                  fill="#4A13E7"
                >
                  <path
                    d="M0.461667 14.0655C0.291259 13.8825 0.206055 13.6659 0.206055 13.4156C0.206055 13.1653 0.291259 12.9489 0.461667 12.7665L5.45463 7.40568L0.444626 2.0266C0.285579 1.85583 0.206055 1.64238 0.206055 1.38623C0.206055 1.13008 0.291259 0.91053 0.461667 0.727568C0.632076 0.544606 0.833839 0.453125 1.06696 0.453125C1.30008 0.453125 1.50161 0.544606 1.67157 0.727568L7.39729 6.89338C7.46545 6.96657 7.51385 7.04585 7.54247 7.13123C7.5711 7.21662 7.58519 7.3081 7.58474 7.40568C7.58474 7.50326 7.57042 7.59474 7.54179 7.68012C7.51316 7.7655 7.465 7.84478 7.39729 7.91797L1.65453 14.0838C1.49548 14.2545 1.29939 14.3399 1.06628 14.3399C0.833157 14.3399 0.631621 14.2485 0.461667 14.0655Z"
                    fill="#4A13E7"
                  />
                </svg>
              </div>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
