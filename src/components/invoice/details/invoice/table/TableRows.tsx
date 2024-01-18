import Image from "next/image";
import React from "react";
import toggleIcon from "@/assets/svgs/edit_info.svg";
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
import { useTranslation } from "next-i18next";

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
  const { t: translate } = useTranslation();
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
            className="hover:bg-[#E9E1FF] items-center bg-white px-6 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px),minmax(170px,_4fr)_minmax(200px,_3fr)_minmax(200px,_200px)_minmax(100px,_100px)_minmax(170px,_170px)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(110px,_110px)_minmax(40px,_40px)] mlg:grid-cols-[minmax(80px,_80px)_minmax(100px,_100%)_minmax(90px,_90px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(40px,_40px)] xlg:grid-cols-[minmax(80px,_80px)_minmax(100px,_100%)_minmax(90px,_90px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(80px,_80px)] maxSize:grid-cols-[minmax(80px,_80px)_minmax(70px,_4fr)_minmax(140px,_3fr)_minmax(80px,_80px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(80px,_80px)] xMaxSize:grid-cols-[minmax(80px,_80px),minmax(80px,_4fr)_minmax(120px,_3fr)_minmax(80px,_80px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(40px,_40px)] xLarge:grid-cols-[minmax(80px,_80px),minmax(80px,_4fr)_minmax(130px,_3fr)_minmax(170px,_170px)_minmax(80px,_80px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(40px,_40px)] mt-2 rounded-md"
          >
            <span className="py-4 truncate">{item.invoiceNumber}</span>
            <span className="py-4 truncate">
              {
                item.invoiceID?.contractID?.offerID?.leadID?.customerDetail
                  ?.fullName
              }
            </span>
            <span className=" py-4 mlg:hidden maxSize:block truncate mr-1">
              {item?.title}
            </span>
            <span className="py-4 truncate mlg:hidden xLarge:block">
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
                {translate(item?.emailStatus)}
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
                } min-w-[70px] rounded-lg px-1 py-[3px] flex items-center justify-center`}
                dropDownTextClassName="text-white text-base font-medium pe-2"
                dropDownIconClassName={`text-[#fff]`}
                dropDownItemsContainerClassName="w-full"
              />
            </span>
            <span className="py-4 flex items-center mx-1">
              <DropDown
                items={Object.keys(staticEnums["InvoiceStatus"])
                  ?.slice(0, -1)
                  ?.map((item) => ({ item: item }))}
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
                }  min-w-[90px] rounded-lg px-1 py-[3px] flex items-center justify-center`}
                dropDownTextClassName="text-white text-base font-medium pe-2"
                key={item.id}
                dropDownIconClassName={`text-[#fff]`}
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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="#0000FF"
              >
                <path
                  d="M0.461667 14.0074C0.291259 13.8244 0.206055 13.6078 0.206055 13.3575C0.206055 13.1072 0.291259 12.8908 0.461667 12.7084L5.45463 7.34757L0.444626 1.96849C0.285579 1.79773 0.206055 1.58427 0.206055 1.32813C0.206055 1.07198 0.291259 0.852424 0.461667 0.669462C0.632076 0.4865 0.833839 0.39502 1.06696 0.39502C1.30008 0.39502 1.50161 0.4865 1.67157 0.669462L7.39729 6.83528C7.46545 6.90846 7.51385 6.98775 7.54247 7.07313C7.5711 7.15851 7.58519 7.24999 7.58474 7.34757C7.58474 7.44515 7.57042 7.53663 7.54179 7.62201C7.51316 7.7074 7.465 7.78668 7.39729 7.85986L1.65453 14.0257C1.49548 14.1964 1.29939 14.2818 1.06628 14.2818C0.833157 14.2818 0.631621 14.1903 0.461667 14.0074Z"
                  fill="#0000FF"
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
