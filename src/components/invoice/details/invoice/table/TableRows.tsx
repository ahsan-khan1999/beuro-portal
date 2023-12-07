import Image from "next/image";
import React from "react";
import toggleIcon from "@/assets/svgs/toggle_icon.svg";
import moreIcon from "@/assets/svgs/entity_more_info.svg";
import { InvoiceDetailsTableRowTypes } from "@/types/invoice";
import { useRouter } from "next/router";

const TableRows = ({
  dataToAdd,
}: {
  dataToAdd: InvoiceDetailsTableRowTypes[];
}) => {
  const router = useRouter();

  return (
    <div>
      {dataToAdd?.map((item: any, index: number) => {
        return (
          <div
            onClick={() => router.push("/invoices/invoice-pdf-preview")}
            key={index}
            className="px-5 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px)_minmax(150px,_150px)_minmax(240px,_100%)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(140px,_140px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(100px,_100px),minmax(130px,_100%)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(100px,_100px),minmax(130px,_100%)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(100px,_100px),minmax(130px,_100%)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] xMaxSize:grid-cols-[minmax(90px,_90px),minmax(130px,_130px)_minmax(160px,_100%)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(100px,_100px)_minmax(50px,_50px)] mt-2 bg-white rounded-md"
          >
            <span className="py-4 bg-white rounded-md ">{item.id}</span>
            <span className="py-4 bg-white ">{item.customer}</span>
            <span className="xs:block mlg:hidden xlg:hidden maxSize:hidden xMaxSize:block py-4 bg-white ">
              {item.invoiceTitle}
            </span>
            <span className="py-4 bg-white ">
              {item.issueDate.toLocaleDateString()}
            </span>
            <span className="py-4 bg-white ">{item.amount}</span>

            <span className="py-4 bg-white flex justify-center items-center ">
              <div
                className={`w-[90%] ${
                  item.emailStatus.includes("Sent")
                    ? "bg-[#4A13E7]"
                    : item.emailStatus.includes("Post")
                    ? "bg-[#FF376F]"
                    : "bg-[#FE9244]"
                } text-white px-2 py-1 text-center rounded-md text-sm`}
              >
                <span>{item.emailStatus}</span>
              </div>
            </span>

            <span className="py-4 bg-white ">
              <div
                className={`flex items-center justify-center gap-1 ${
                  item.payment.includes("Online")
                    ? "bg-[#4A13E7]"
                    : "bg-[#45C769]"
                } text-white px-2 py-1 text-center rounded-md  w-[90px] text-sm`}
              >
                <span>{item.payment}</span>
                <Image src={toggleIcon} alt="toggleIcon" />
              </div>
            </span>
            <span className="py-4 bg-white ">
              <div
                className={`flex items-center justify-center gap-1 ${
                  item.status.includes("Overdue")
                    ? "bg-[#F00]"
                    : item.status.includes("Pending")
                    ? "bg-[#FE9244]"
                    : "bg-[#FF376F]"
                } text-white px-2 py-1 text-center rounded-md  w-full text-sm`}
              >
                <span>{item.status}</span>
                <Image src={toggleIcon} alt="toggleIcon" />
              </div>
            </span>

            <span className="py-4 flex justify-center items-center bg-white rounded-md">
              <Image src={moreIcon} alt="moreIcon" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
