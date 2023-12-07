import Image from "next/image";
import React from "react";
import toggleIcon from "@/assets/svgs/toggle_icon.svg";
import moreIcon from "@/assets/svgs/entity_more_info.svg";
import { InvoiceTableRowTypes, SubInvoiceTableRowTypes } from "@/types/invoice";
import { useRouter } from "next/router";
import { formatDateTimeToDate, getInvoiceEmailColor, getInvoiceStatusColor } from "@/utils/utility";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { staticEnums } from "@/utils/static";

const TableRows = ({
  dataToAdd,
  handlePaymentStatusUpdate,
  handleInvoiceStatusUpdate
}: {
  dataToAdd: SubInvoiceTableRowTypes[];
  handleInvoiceStatusUpdate: (id: string, status: string) => void;
  handlePaymentStatusUpdate: (id: string, status: string) => void;

}) => {
  const router = useRouter();

  return (
    <div>
      {dataToAdd?.map((item, index: number) => {
        return (
          <div
            key={index}
            className="relative h-[200px] z-0 cursor-pointer shadow-tableRow grid  grid-cols-[minmax(120px,_100%),minmax(180px,_100%)_minmax(300px,_100%)_minmax(150px,_100%)_minmax(150px,_100%)_minmax(150px,_100%)_minmax(150px,_150px)_minmax(150px,_100%)_minmax(70px,_70px)] mt-2 bg-white rounded-md"
          >
            <span className="px-6 py-4 bg-white rounded-md ">{item.invoiceNumber}</span>
            <span className="px-6 py-4 bg-white  ">{item.invoiceID?.contractID?.offerID?.customerID?.fullName}</span>
            <span className="px-6 py-4 bg-white ">{item.invoiceID?.contractID?.offerID?.title}</span>
            <span className="px-6 py-4 bg-white ">
              {formatDateTimeToDate(item.createdAt)}
            </span>
            <span className="px-6 py-4 bg-white ">{item.amount + " CHF"}</span>

            <span className="px-10 py-4 bg-white ">
              <div
                className={`bg-[${getInvoiceEmailColor(item.emailStatus)}] text-white px-2 py-1 text-center rounded-md   text-sm`}
              >
                {item.emailStatus}
              </div>

            </span>

            <span className="px-6 py-4 bg-white ">

              <DropDown
                items={Object.keys(staticEnums['PaymentType']).map((item) => ({ item: item }))}
                selectedItem={item.paymentType}
                onItemSelected={(status) => handlePaymentStatusUpdate(item.id, status)}
                dropDownClassName={`${staticEnums['PaymentType'][item.paymentType] === 0 ? 'bg-[#45C769]' : 'bg-[#4A13E7]'}  w-fit rounded-lg px-4 py-[3px] flex items-center`}
                dropDownTextClassName="text-white text-base font-medium pe-2"
                dropDownIconClassName={"#fff"}
              />
            </span>
            <span className="px-6 py-4 bg-white ">
              <DropDown
                items={Object.keys(staticEnums['InvoiceStatus']).map((item) => ({ item: item }))}
                selectedItem={item.invoiceStatus}
                onItemSelected={(status) => handleInvoiceStatusUpdate(item.id, status)}
                dropDownClassName={`${staticEnums['InvoiceStatus'][item.invoiceStatus] === 0 ? 'bg-[#45C769]' : 'bg-[#4A13E7]'}  w-fit rounded-lg px-4 py-[3px] flex items-center`}
                dropDownTextClassName="text-white text-base font-medium pe-2"
                dropDownIconClassName={"#fff"}
              />
            </span>

            <span className="px-6 py-4 flex justify-center items-center bg-white rounded-md"
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
