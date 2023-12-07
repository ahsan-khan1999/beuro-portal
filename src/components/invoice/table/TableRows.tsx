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
            className="hover:bg-[#E9E1FF] px-5 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(80px,_80px)_minmax(150px,_150px)_minmax(250px,_100%)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(80px,_80px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(80px,_80px),minmax(130px,_100%)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(70px,_70px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(80px,_80px),minmax(130px,_100%)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(70px,_70px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(80px,_80px),minmax(130px,_130px)_minmax(160px,_100%)_minmax(90px,_90px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(70px,_70px)_minmax(50px,_50px)]  mt-2 bg-white rounded-md"
          >
            <span className="py-4 rounded-md flex items-center">{item.id}</span>
            <span className="py-4 flex items-center">{item.customer}</span>
            <span className="mlg:hidden xlg:hidden py-4 maxSize:flex items-center">
              {item.invoiceTitle}
            </span>
            <span className="py-4 flex items-center">{item.totalPrice}</span>

            <span className="py-4 flex justify-center items-center">
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
            <span className="py-4 flex justify-center items-center">
              <div className="flex rounded-md w-fit">
                <div
                  className={`${
                    parseInt(item.paid.initialValue) >
                    parseInt(item.paid.finalValue)
                      ? "w-2/3"
                      : "w-1/3"
                  } bg-[#4A13E7] text-white px-2 py-1  flex justify-center items-center rounded-tl-md rounded-bl-md text-center text-sm`}
                >
                  {item.paid.initialValue}
                </div>
                <div
                  className={`${
                    parseInt(item.paid.initialValue) <=
                    parseInt(item.paid.finalValue)
                      ? "w-2/3"
                      : "w-1/3"
                  } bg-[#EDE7FD] text-[#393939] flex justify-center items-center px-2 py-1 rounded-tr-md rounded-br-md text-center text-sm`}
                >
                  {item.paid.finalValue}
                </div>
              </div>
            </span>

            <span className="py-4 flex justify-center items-center">
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
            <span className="py-4 flex justify-center items-center  ">
              <Image
                src={item.editNote}
                onClick={(e) => handleNotes(item, e)}
                alt="edit_img_icon"
              />
            </span>
            <span className="py-4 flex justify-center items-center rounded-md">
              <Image src={moreInfo} alt="moreInfo" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
