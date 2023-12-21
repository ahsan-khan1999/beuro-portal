import Image from "next/image";
import React from "react";
import pdfIcon from "@/assets/svgs/primary_pdf_icon.svg";
import { SubInvoiceTableRowTypes } from "@/types/invoice";
import { useRouter } from "next/router";
import { formatDateTimeToDate, getInvoiceEmailColor } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import moreIcon from "@/assets/svgs/entity_more_info.svg";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";

const TableRows = ({
  collectiveInvoice,
  handleInvoiceStatusUpdate,
  handlePaymentStatusUpdate,
}: {
  collectiveInvoice: SubInvoiceTableRowTypes[];
  handlePaymentStatusUpdate: (id: string, status: string, type: string) => void;
  handleInvoiceStatusUpdate: (id: string, status: string, type: string) => void;
}) => {
  const router = useRouter();
  return (
    <div>
      {collectiveInvoice?.map((item, index: number) => {
        return (
          <div
            key={index}
            className="hover:bg-[#E9E1FF] bg-white px-6 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px),minmax(170px,_170px)_minmax(250px,_100%)_minmax(130px,_130px)_minmax(110px,_110px)_minmax(150px,_150px)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(70px,_70px)] mlg:grid-cols-[minmax(90px,_90px)_minmax(100px,_100%)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(110px,_110px)_minmax(110px,_110px)_minmax(120px,_120px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(90px,_90px)_minmax(100px,_100%)_minmax(100px,_100px)_minmax(80px,_80px)_minmax(110px,_110px)_minmax(110px,_110px)_minmax(120px,_120px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(90px,_90px)_minmax(100px,_100%)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(50px,_50px)] xMaxSize:grid-cols-[minmax(90px,_90px),minmax(120px,_120px)_minmax(100px,_100%)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(50px,_50px)] mt-2 rounded-md"
          >
            <span className="py-4 flex items-center">{item.invoiceNumber}</span>
            <span className="py-4 flex items-center mlg:hidden xMaxSize:flex">
              {item.invoiceID?.contractID?.offerID?.leadID?.customerDetail?.fullName}
            </span>
            <span className="py-4 flex items-center break-all">
              {item.invoiceID?.contractID?.offerID?.title}
            </span>
            <span className="py-4 flex items-center">
              {formatDateTimeToDate(item.createdAt)}
            </span>
            <span className="py-4 flex items-center">
              {item.amount + " CHF"}
            </span>

            <span className="py-4 flex items-center justify-center">
              <div
                className={`bg-[${getInvoiceEmailColor(
                  item.emailStatus
                )}] text-white px-2 py-1 text-center rounded-md text-sm flex justify-center items-center`}
              >
                {item.emailStatus}
              </div>
            </span>

            <span className="py-4 flex items-center">
              <DropDown
                items={Object.keys(staticEnums["PaymentType"]).map((item) => ({
                  item: item,
                }))}
                selectedItem={item.paymentType}
                onItemSelected={(status) =>
                  handlePaymentStatusUpdate(item.id, status, "reciept")
                }
                dropDownClassName={`${
                  staticEnums["PaymentType"][item.paymentType] === 0
                    ? "bg-[#45C769]"
                    : "bg-[#4A13E7]"
                }  w-fit rounded-lg px-4 py-[3px] flex items-center`}
                dropDownTextClassName="text-white text-base font-medium pe-2"
                dropDownIconClassName={"#fff"}
              />
            </span>
            <span className="py-4 flex items-center">
              <DropDown
                items={Object.keys(staticEnums["InvoiceStatus"]).map(
                  (item) => ({ item: item })
                )}
                selectedItem={item.invoiceStatus}
                onItemSelected={(status) =>
                  handleInvoiceStatusUpdate(item.id, status, "reciept")
                }
                dropDownClassName={`${
                  staticEnums["InvoiceStatus"][item.invoiceStatus] === 0
                    ? "bg-[#45C769]"
                    : staticEnums["InvoiceStatus"][item.invoiceStatus] === 2
                    ? "bg-[#4A13E7]"
                    : "bg-red"
                }  w-fit rounded-lg px-4 py-[3px] flex items-center`}
                dropDownTextClassName="text-white text-base font-medium pe-2"
                dropDownIconClassName={"#fff"}
                key={item.id}

              />
            </span>

            <span
              className="py-4 flex justify-center items-center"
              onClick={() => router.push("/invoices/invoice-pdf-preview")}
            >
              <Image src={moreIcon} alt="moreIcon" />
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
