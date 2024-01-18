import React from "react";
import { SubInvoiceTableRowTypes } from "@/types/invoice";
import { useRouter } from "next/router";
import { formatDateTimeToDate, getInvoiceEmailColor } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
import { updateQuery } from "@/utils/update-query";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";

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
  const { t: translate } = useTranslation();
  const { systemSettings } = useAppSelector((state) => state.settings);

  const handleReceiptPreview = (id?: string) => {
    router.pathname = "/invoices/receipt-email";
    router.query = { invoiceID: id };
    updateQuery(router, router.locale as string);
  };
  return (
    <div className="h-screen">
      {collectiveInvoice?.map((item, index: number) => {
        return (
          <div
            key={index}
            className="hover:bg-[#E9E1FF] bg-white px-6 cursor-pointer shadow-tableRow xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px),minmax(170px,_4fr)_minmax(200px,_3fr)_minmax(160px,_160px)_minmax(130px,_130px)_minmax(150px,_150px)_minmax(140px,_140px)_minmax(150px,_150px)_minmax(70px,_70px)] mlg:grid-cols-[minmax(90px,_90px)_minmax(80px,_100%)_minmax(140px,_140px)_minmax(110px,_110px)_minmax(110px,_110px)_minmax(120px,_120px)_minmax(50px,_50px)] xlg:grid-cols-[minmax(90px,_90px)_minmax(80px,_100%)_minmax(140px,_140px)_minmax(110px,_110px)_minmax(110px,_110px)_minmax(110px,_110px)_minmax(120px,_120px)_minmax(50px,_50px)] maxSize:grid-cols-[minmax(90px,_90px)_minmax(100px,_100%)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(50px,_50px)] xMaxSize:grid-cols-[minmax(90px,_90px),minmax(120px,_4fr)_minmax(100px,_3fr)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(50px,_50px)] mt-2 rounded-md"
          >
            <span className="py-4 truncate">{item.invoiceNumber}</span>
            <span className="py-4 truncate">
              {
                item.invoiceID?.contractID?.offerID?.leadID?.customerDetail
                  ?.fullName
              }
            </span>
            <span className="py-4 truncate mr-1 mlg:hidden xMaxSize:block">
              {item?.title}
            </span>
            <span className="py-4 truncate">
              {formatDateTimeToDate(item.createdAt)}
            </span>
            <span className="py-4 truncate mlg:hidden xlg:block">
              {item.amount + " " + systemSettings?.currency}
            </span>

            <span className="py-4 flex items-center justify-center">
              <div
                style={{
                  backgroundColor: `${getInvoiceEmailColor(item.emailStatus)}`,
                }}
                className=" text-white px-2 py-1 text-center rounded-md text-sm flex justify-center items-center min-w-[70px]"
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
                  handlePaymentStatusUpdate(item.id, status, "reciept")
                }
                dropDownClassName={`${
                  staticEnums["PaymentType"][item.paymentType] === 0
                    ? "bg-[#45C769]"
                    : "bg-[#4A13E7]"
                } min-w-[70px] rounded-lg px-4 py-[3px] flex items-center justify-center`}
                dropDownTextClassName="text-white text-base font-medium pe-2"
                dropDownIconClassName={`text-[#fff]`}
                dropDownItemsContainerClassName="w-full"
              />
            </span>
            <span className="py-4 flex items-center mx-2">
              <DropDown
                items={Object.keys(staticEnums["InvoiceStatus"])
                  ?.slice(0, -1)
                  ?.map((item) => ({ item: item }))}
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
                }  min-w-[90px] rounded-lg px-4 py-[3px] flex items-center justify-center`}
                dropDownTextClassName="text-white text-base font-medium pe-2"
                dropDownIconClassName={`text-[#fff]`}
                dropDownItemsContainerClassName="w-full"
                key={item.id}
              />
            </span>

            <span
              className="py-4 flex justify-center items-center"
              onClick={() => handleReceiptPreview(item?.id)}
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
