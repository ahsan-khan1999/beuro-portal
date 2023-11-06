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
            className="cursor-pointer shadow-tableRow grid  grid-cols-[minmax(120px,_100%),minmax(180px,_100%)_minmax(300px,_100%)_minmax(150px,_100%)_minmax(150px,_100%)_minmax(150px,_100%)_minmax(150px,_150px)_minmax(150px,_100%)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md ">{item.id}</span>
            <span className="px-6 py-4 bg-white  ">{item.customer}</span>
            <span className="px-6 py-4 bg-white ">{item.invoiceTitle}</span>
            <span className="px-6 py-4 bg-white ">
              {item.issueDate.toLocaleDateString()}
            </span>
            <span className="px-6 py-4 bg-white ">{item.amount}</span>

            <span className="px-6 py-4 bg-white ">
              <div
                className={`${
                  item.emailStatus.includes("Sent")
                    ? "bg-[#4A13E7]"
                    : item.emailStatus.includes("Post")
                    ? "bg-[#FF376F]"
                    : "bg-[#FE9244]"
                } text-white px-2 py-1 text-center rounded-md  w-full text-sm`}
              >
                {item.emailStatus}
              </div>
            </span>

            <span className="px-6 py-4 bg-white ">
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
            <span className="px-6 py-4 bg-white ">
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

            <span className="px-6 py-4 flex justify-center items-center bg-white rounded-md">
              <Image src={moreIcon} alt="moreIcon" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
