import Image from "next/image";
import React from "react";
import toggleIcon from "@/assets/svgs/edit_info.svg";
import moreIcon from "@/assets/svgs/entity_more_info.svg";
import { SubInvoiceTableRowTypes } from "@/types/invoice";
import { useRouter } from "next/router";
import {
  formatDateTimeToDate,
  getInvoiceEmailColor,
  getInvoiceStatusColor,
} from "@/utils/utility";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";

const TableRows = ({
  dataToAdd,
  handlePaymentStatusUpdate,
  handleInvoiceStatusUpdate,
  handleInvoiceEdit,
}: {
  dataToAdd: SubInvoiceTableRowTypes[];
  handleInvoiceStatusUpdate: (id: string, status: string) => void;
  handlePaymentStatusUpdate: (id: string, status: string) => void;
  handleInvoiceEdit: (item: any) => void;
}) => {
  const router = useRouter();

  return (
    <div>
      {dataToAdd?.map((item, index: number) => {
        return (
          <div
            key={index}
            className="hover:bg-[#E9E1FF] bg-white px-6 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px),minmax(170px,_170px)_minmax(220px,_100%)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(150px,_150px)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(70px,_70px)_minmax(50px,_50px)] mlg:grid-cols-[minmax(90px,_90px)_minmax(100px,_100%)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(110px,_110px)_minmax(110px,_110px)_minmax(120px,_120px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(90px,_90px)_minmax(100px,_100%)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(110px,_110px)_minmax(110px,_110px)_minmax(120px,_120px)_minmax(50px,_50px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(90px,_90px)_minmax(100px,_100%)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(50px,_50px)_minmax(50px,_50px)] xMaxSize:grid-cols-[minmax(90px,_90px),minmax(120px,_120px)_minmax(100px,_100%)_minmax(100px,_100px)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(50px,_50px)_minmax(50px,_50px)] mt-2 rounded-md"
          >
            <span className="py-4 rounded-md">{item.invoiceNumber}</span>
            <span className="py-4 mlg:hidden xMaxSize:block">
              {item.invoiceID?.contractID?.offerID?.customerID?.fullName}
            </span>
            <span className="py-4">
              {item.invoiceID?.contractID?.offerID?.title}
            </span>
            <span className="py-4">{formatDateTimeToDate(item.createdAt)}</span>
            <span className="py-4">{item.amount + " CHF"}</span>

            <span className="py-4">
              <div
                className={`bg-[${getInvoiceEmailColor(
                  item.emailStatus
                )}] text-white px-2 py-1 text-center rounded-md text-sm flex justify-center items-center`}
              >
                <span>{item.emailStatus}</span>
              </div>
            </span>

            <span className="py-4">
              <DropDown
                items={Object.keys(staticEnums["PaymentType"]).map((item) => ({
                  item: item,
                }))}
                selectedItem={item.paymentType}
                onItemSelected={(status) =>
                  handlePaymentStatusUpdate(item.id, status)
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
            <span className="py-4 ">
              <DropDown
                items={Object.keys(staticEnums["InvoiceStatus"]).map(
                  (item) => ({ item: item })
                )}
                selectedItem={item.invoiceStatus}
                onItemSelected={(status) =>
                  handleInvoiceStatusUpdate(item.id, status)
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
              />
            </span>
            <span
              className="py-4 flex justify-center items-center rounded-md"
              onClick={() => handleInvoiceEdit(item)}
            >
              <Image src={toggleIcon} alt="moreIcon" />
            </span>
            <span
              className="py-4 flex justify-center items-center rounded-md mlg:hidden xlg:flex"
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
