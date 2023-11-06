import Image from "next/image";
import React from "react";
import pdfIcon from "@/assets/svgs/primary_pdf_icon.svg";
import { ReceiptDetailsTableRowTypes } from "@/types/invoice";
import { useRouter } from "next/router";

const TableRows = ({
  dataToAdd,
}: {
  dataToAdd: ReceiptDetailsTableRowTypes[];
}) => {
  const router = useRouter();
  return (
    <div>
      {dataToAdd?.map((item: any, index: number) => {
        return (
          <div
            onClick={() => router.push("/invoices/receipt-pdf-preview")}
            key={index}
            className=" cursor-pointer shadow-tableRow grid  grid-cols-[minmax(120px,_100%),minmax(180px,_100%)_minmax(300px,_100%)_minmax(150px,_100%)_minmax(100px,_100%)_minmax(100px,_100%)_minmax(120px,_100%)_minmax(120px,_100%)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md ">{item.id}</span>
            <span className="px-6 py-4 bg-white  ">{item.customer}</span>
            <span className="px-6 py-4 bg-white ">{item.receiptTitle}</span>
            <span className="px-6 py-4 bg-white ">
              {item.paidDate.toLocaleDateString()}
            </span>
            <span className="px-6 py-4 bg-white ">{item.amount}</span>

            <span className=" flex justify-center items-center px-6 py-4 bg-white ">
              <Image src={pdfIcon} alt="pdfIcon" />
            </span>

            <span className="flex items-center justify-cente px-6 py-4 bg-white ">
              <div
                className={`r gap-1 ${
                  item.payment.includes("Online")
                    ? "bg-[#4A13E7]"
                    : "bg-[#45C769]"
                } text-white px-2 py-1 text-center rounded-md  w-[90px] text-sm`}
              >
                <span>{item.payment}</span>
              </div>
            </span>

            <span className="flex justify-center items-center px-6 py-4 bg-white ">
              <div
                className={` ${
                  item.emailStatus.includes("Sent")
                    ? "bg-[#4A13E7]"
                    : "bg-[#FE9244]"
                } text-white px-2 py-1 text-center rounded-md  w-[100px] text-sm`}
              >
                {item.emailStatus}
              </div>
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

export default TableRows;
