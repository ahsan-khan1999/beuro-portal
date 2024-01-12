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
import { useAppSelector } from "@/hooks/useRedux";
import { updateQuery } from "@/utils/update-query";

const TableRows = ({
  dataToAdd,
  handlePaymentStatusUpdate,
  handleInvoiceStatusUpdate,
  handleInvoiceEdit,
  handleRecurringInvoiceEdit,
}: {
  dataToAdd: SubInvoiceTableRowTypes[];
  handleInvoiceStatusUpdate: (id: string, status: string, type: string) => void;
  handlePaymentStatusUpdate: (id: string, status: string, type: string) => void;
  handleInvoiceEdit: (item: any) => void;
  handleRecurringInvoiceEdit: (item: any) => void;
}) => {
  const router = useRouter();
  const { invoiceDetails, collectiveInvoice } = useAppSelector(
    (state) => state.invoice
  );
  const { systemSettings } = useAppSelector((state) => state.settings);
  const handleInvoicePdfPreview = (id?: string) => {
    router.pathname = "/invoices/compose-mail";
    router.query = { invoiceID: id };
    updateQuery(router, router.locale as string);
  };

  return (
    <div className="h-screen">
      {collectiveInvoice?.map((item, index: number) => {
        return (
          <div
            key={index}
            className="hover:bg-[#E9E1FF] bg-white px-6 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px),minmax(170px,_170px)_minmax(300px,_100%)_minmax(200px,_200px)_minmax(100px,_100px)_minmax(170px,_170px)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(110px,_110px)_minmax(40px,_40px)] mlg:grid-cols-[minmax(80px,_80px)_minmax(100px,_100%)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(40px,_40px)] xlg:grid-cols-[minmax(80px,_80px)_minmax(100px,_100%)_minmax(90px,_90px)_minmax(110px,_110px)_minmax(110px,_110px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(80px,_80px)] maxSize:grid-cols-[minmax(80px,_80px)_minmax(100px,_100px)_minmax(100px,_100%)_minmax(80px,_80px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(80px,_80px)] xMaxSize:grid-cols-[minmax(80px,_80px),minmax(110px,_110px)_minmax(100px,_100%)_minmax(80px,_80px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(40px,_40px)] xLarge:grid-cols-[minmax(80px,_80px),minmax(110px,_110px)_minmax(100px,_100%)_minmax(170px,_170px)_minmax(80px,_80px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(40px,_40px)] mt-2 rounded-md"
          >
            <span className="py-4 flex items-center">{item.invoiceNumber}</span>
            <span className="break-all py-4 flex items-center">
              {
                item.invoiceID?.contractID?.offerID?.leadID?.customerDetail
                  ?.fullName
              }
            </span>
            <span className="break-all py-4 flex items-center mlg:hidden maxSize:flex">
              {item?.title}
            </span>
            <span className="py-4 flex items-center mlg:hidden xLarge:flex">
              {formatDateTimeToDate(item.createdAt)}
            </span>
            <span className="py-4 flex items-center">
              {item.amount + " " + systemSettings?.currency}
            </span>

            <span className="py-4 flex justify-center items-center">
              <div
                style={{
                  backgroundColor: `${getInvoiceEmailColor(item.emailStatus)}`,
                }}
                className="text-white px-2 flex justify-center items-center py-1 text-center rounded-md text-sm min-w-[70px]"
              >
                <span>{item.emailStatus}</span>
              </div>
            </span>

            <span className="py-4 flex items-center mx-2">
              <DropDown
                items={Object.keys(staticEnums["PaymentType"]).map((item) => ({
                  item: item,
                }))}
                selectedItem={item.paymentType}
                onItemSelected={(status) =>
                  handlePaymentStatusUpdate(item.id, status, "invoice")
                }
                dropDownClassName={`${
                  staticEnums["PaymentType"][item.paymentType] === 0
                    ? "bg-[#45C769]"
                    : "bg-[#4A13E7]"
                } min-w-[70px] rounded-lg px-4 py-[3px] flex items-center`}
                dropDownTextClassName="text-white text-base font-medium pe-2"
                dropDownIconClassName={"#fff"}
                dropDownItemsContainerClassName="w-full"
              />
            </span>
            <span className="py-4 flex items-center mx-1">
              <DropDown
                items={Object.keys(staticEnums["InvoiceStatus"]).map(
                  (item) => ({ item: item })
                )}
                selectedItem={item.invoiceStatus}
                onItemSelected={(status) =>
                  handleInvoiceStatusUpdate(item.id, status, "invoice")
                }
                dropDownClassName={`${
                  staticEnums["InvoiceStatus"][item.invoiceStatus] === 0
                    ? "bg-[#45C769]"
                    : staticEnums["InvoiceStatus"][item.invoiceStatus] === 2
                    ? "bg-[#4A13E7]"
                    : "bg-red"
                }  min-w-[90px] rounded-lg px-4 py-[3px] flex items-center`}
                dropDownTextClassName="text-white text-base font-medium pe-2"
                dropDownIconClassName={"#fff"}
                key={item.id}
                dropDownItemsContainerClassName="w-full"
              />
            </span>
            <span
              className="py-4 flex justify-center items-center"
              onClick={() => {
                if (!invoiceDetails?.isInvoiceRecurring) {
                  handleInvoiceEdit(item);
                } else {
                  handleRecurringInvoiceEdit(item);
                }
              }}
            >
              <Image src={toggleIcon} alt="moreIcon" />
            </span>
            <span
              className="py-4 flex justify-center items-center"
              onClick={() => handleInvoicePdfPreview(item?.id)}
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
