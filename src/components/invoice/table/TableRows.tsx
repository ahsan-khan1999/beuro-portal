import { InvoiceTableRowTypes } from "@/types/invoice";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import moreInfo from "@/assets/svgs/entity_more_info.svg";

const TableRows = ({
  dataToAdd,
  handleNotes,
}: {
  dataToAdd: InvoiceTableRowTypes[];
  handleNotes: Function;
}) => {
  const router = useRouter();
  return (
    <div>
      {dataToAdd?.map((item: any, index: number) => {
        return (
          <div
            onClick={() => router.push("/invoices/details")}
            key={index}
            className="cursor-pointer shadow-tableRow grid  grid-cols-[minmax(120px,_100%),minmax(180px,_100%)_minmax(300px,_100%)_minmax(150px,_100%)_minmax(150px,_100%)_minmax(150px,_100%)_minmax(150px,_150px)_minmax(100px,_100px)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md flex  items-center">
              {item.id}
            </span>
            <span className="px-6 py-4 bg-white  flex  items-center">
              {item.customer}
            </span>
            <span className="px-6 py-4 bg-white flex  items-center">
              {item.invoiceTitle}
            </span>
            <span className="px-6 py-4 bg-white flex  items-center">
              {item.totalPrice}
            </span>

            <span className="px-6 py-4 bg-white flex justify-center items-center">
              <div
                className={`${
                  item.emailStatus.includes("1/2 Sent")
                    ? "bg-[#FE9244]"
                    : "bg-[#4A13E7]"
                } text-white px-2 py-1 text-center rounded-md  w-fit text-sm`}
              >
                {item.emailStatus}
              </div>
            </span>
            <span className="px-6 py-4 bg-white flex justify-center items-center">
              <div className="flex rounded-md w-full">
                <div
                  className={`${
                    parseInt(item.paid.initialValue) >
                    parseInt(item.paid.finalValue)
                      ? "w-2/3"
                      : "w-1/3"
                  } bg-[#4A13E7] text-white pl-2 py-1 rounded-tl-md rounded-bl-md text-center text-sm`}
                >
                  {item.paid.initialValue}
                </div>
                <div
                  className={`${
                    parseInt(item.paid.initialValue) <=
                    parseInt(item.paid.finalValue)
                      ? "w-2/3"
                      : "w-1/3"
                  } bg-[#EDE7FD] text-[#393939] pr-2 py-1 rounded-tr-md rounded-br-md text-center text-sm`}
                >
                  {item.paid.finalValue}
                </div>
              </div>
            </span>

            <span className="px-6 py-4 bg-white flex justify-center items-center">
              <div
                className={`${
                  item.status.includes("Overdue")
                    ? "bg-[#FF0000]"
                    : item.status.includes("Paid")
                    ? "bg-[#45C769]"
                    : "bg-[#FE9244]"
                } text-white px-2 py-1 text-center rounded-md  w-full text-sm`}
              >
                {item.status}
              </div>
            </span>
            <span className="px-6 py-4 flex justify-center items-center  bg-white ">
              <Image
                src={item.editNote}
                onClick={(e) => handleNotes(item, e)}
                alt="edit_img_icon"
              />
            </span>
            <span className="px-6 py-4 flex justify-center items-center bg-white rounded-md">
              <Image src={moreInfo} alt="moreInfo" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
