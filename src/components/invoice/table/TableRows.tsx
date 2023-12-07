import { InvoiceTableRowTypes } from "@/types/invoice";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import { getInvoiceStatusColor } from "@/utils/utility";
import editInfo from "@/assets/svgs/Edit_note.svg";
import moreInfo from "@/assets/svgs/entity_more_info.svg";
const TableRows = ({
  dataToAdd,
  handleNotes,
}: {
  dataToAdd: InvoiceTableRowTypes[];
  handleNotes: (item: string,
    e?: React.MouseEvent<HTMLSpanElement>) => void;
}) => {
  const router = useRouter();
  return (
    <div>
      {dataToAdd?.map((item, index: number) => {
        return (
          <div
            key={index}
            className="cursor-pointer shadow-tableRow grid  grid-cols-[minmax(120px,_100%),minmax(180px,_100%)_minmax(300px,_100%)_minmax(150px,_100%)_minmax(150px,_100%)_minmax(150px,_100%)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md flex  items-center">
              {item.invoiceNumber}
            </span>
            <span className="px-6 py-4 bg-white  flex  items-center">
              {item.contractID?.offerID?.customerID?.fullName}
            </span>
            <span className="px-6 py-4 bg-white flex  items-center">
              {item.contractID?.offerID?.title}
            </span>
            <span className="px-6 py-4 bg-white flex  items-center">
              {item.contractID?.offerID?.total}
            </span>

            <span className="px-6 py-4 bg-white flex justify-center items-center">
              <div
                className={`${item.sentEmail === item.totalEmail
                  ? "bg-[#FE9244]"
                  : "bg-[#4A13E7]"
                  } text-white px-2 py-1 text-center rounded-md  w-fit text-sm`}
              >
                {item.sentEmail + '/' + item.totalEmail + " Sent"}
              </div>
            </span>
            <span className="px-6 py-4 bg-white flex justify-center items-center">
              <div className="flex rounded-md w-full">
                <div
                  className={`${parseInt(item.paidAmount) >
                    parseInt(item.totalPrice)
                    ? "w-2/3"
                    : "w-1/3"
                    } bg-[#4A13E7] text-white pl-2 py-1 rounded-tl-md rounded-bl-md text-center text-sm`}
                >
                  {item.paidAmount}
                </div>
                <div
                  className={`${parseInt(item.paidAmount) <=
                    parseInt(item.totalEmail)
                    ? "w-2/3"
                    : "w-1/3"
                    } bg-[#EDE7FD] text-[#393939] pr-2 py-1 rounded-tr-md rounded-br-md text-center text-sm`}
                >
                  {item.remainingAmount}
                </div>
              </div>
            </span>

            <span className="px-6 py-4 bg-white flex justify-center items-center">
              <div
                className={`bg-[${getInvoiceStatusColor(item.invoiceStatus)}] text-white px-2 py-1 text-center rounded-md  w-full text-sm`}
              >
                {item.invoiceStatus}
              </div>
            </span>
            <span className="px-6 py-4 cursor-pointer flex justify-center items-center  bg-white ">
              <Image
                src={editInfo}
                onClick={(e) => handleNotes(item?.id, e)}
                alt="edit_img_icon"
              />
            </span>
            <span className="px-6 py-4 cursor-pointer flex justify-center items-center bg-white rounded-md"
              onClick={() =>
                router.push({
                  pathname: "/invoices/details",
                  query: { invoice: item.id },

                })
              }
            >
              <Image src={moreInfo} alt="moreInfo" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
