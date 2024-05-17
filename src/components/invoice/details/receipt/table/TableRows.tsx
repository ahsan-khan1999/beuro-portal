import React from "react";
import { SubInvoiceTableRowTypes } from "@/types/invoice";
import { useRouter } from "next/router";
import {
  formatDateTimeToDate,
  getInvoiceEmailColor,
  getMailStatusColor,
} from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import { useAppSelector } from "@/hooks/useRedux";
import { useTranslation } from "next-i18next";
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
  const { t: translate } = useTranslation();
  const { systemSettings } = useAppSelector((state) => state.settings);

  const handleReceiptPreview = (id?: string) => {
    router.push({
      pathname: "/invoices/receipt-pdf-preview",
      query: {
        ...router.query,
        tab: "receipt",
        invoiceID: id,
        isMail: true,
      },
    });
  };

  const paymentMethod = [
    `${translate("payment_method.Cash")}`,
    `${translate("payment_method.Online")}`,
  ];

  const invoiceStatus = [
    `${translate("invoice_status.Pending")}`,
    `${translate("invoice_status.Overdue")}`,
    `${translate("invoice_status.Paid")}`,
  ];

  return (
    <div
      className={`overflow-y-visible ${
        collectiveInvoice && collectiveInvoice.length <= 4 ? "h-[550px]" : ""
      }`}
    >
      {collectiveInvoice?.map((item, index: number) => {
        return (
          <div className="flex">
            <div className="mlg:w-full">
              <div
                key={index}
                onClick={() => handleReceiptPreview(item?.id)}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                } px-1 cursor-pointer hover:bg-[#E9E1FF] rounded-md gap-x-3 xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px),minmax(200px,_4fr)_minmax(200px,_3fr)_minmax(160px,_160px)_minmax(130px,_130px)_minmax(150px,_150px)_minmax(140px,_140px)_minmax(150px,_150px)] mlg:grid-cols-[minmax(90px,_90px)_minmax(100px,_3fr)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(110px,_110px)] xlg:grid-cols-[minmax(90px,_90px)_minmax(100px,_3fr)_minmax(120px,_120px)_minmax(110px,_110px)_minmax(100px,_100px)_minmax(110px,_110px)] maxSize:grid-cols-[minmax(90px,_90px)_minmax(100px,_3fr)_minmax(140px,_140px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(110px,_110px)] xMaxSize:grid-cols-[minmax(90px,_90px),minmax(100px,_3fr)_minmax(100px,_4fr)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(120px,_120px)] xLarge:grid-cols-[minmax(90px,_90px),minmax(100px,_3fr)_minmax(100px,_4fr)_minmax(140px,_140px)_minmax(100px,_100px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(120px,_120px)] border-t border-t-[#E7EAEE]`}
              >
                <span className="py-4 truncate">{item.invoiceNumber}</span>
                <span className="py-4 truncate">
                  {item.invoiceID?.customerDetail?.fullName}
                </span>
                <span className="py-4 truncate mlg:hidden xMaxSize:block">
                  {item?.invoiceID?.content?.contentName}
                </span>
                <span className="py-4 truncate mlg:hidden xLarge:block">
                  {formatDateTimeToDate(item.createdAt)}
                </span>
                <span className="py-4 truncate mlg:hidden xlg:block">
                  {item.amount + " " + systemSettings?.currency}
                </span>

                <span className="py-4 flex items-center justify-center">
                  <div
                    style={{
                      backgroundColor: `${getInvoiceEmailColor(
                        item.emailStatus
                      )}`,
                    }}
                    className="text-white px-2 py-1 text-center rounded-md text-sm flex justify-center items-center min-w-[70px] w-full"
                  >
                    {translate(item?.emailStatus)}
                  </div>
                </span>

                <span className="py-4" onClick={(e) => e.stopPropagation()}>
                  <DropDown
                    items={Object.keys(staticEnums["PaymentType"]).map(
                      (item, index) => ({
                        item: {
                          label: paymentMethod[index],
                          value: item,
                        },
                      })
                    )}
                    selectedItem={translate(
                      `payment_method.${item.paymentType}`
                    )}
                    onItemSelected={(status) => {
                      handlePaymentStatusUpdate(item.id, status, "reciept");
                    }}
                    dropDownClassName={`${
                      staticEnums["PaymentType"][item.paymentType] === 0
                        ? "bg-[#45C769]"
                        : "bg-[#4A13E7]"
                    } w-full rounded-lg !py-[3px] flex items-center justify-center gap-x-1`}
                    dropDownTextClassName="text-white text-base font-medium"
                    dropDownIconClassName={`text-[#fff]`}
                    dropDownItemsContainerClassName="w-full"
                    isSecondLastIndex={
                      collectiveInvoice?.length <= 2
                        ? false
                        : index === collectiveInvoice?.length - 2
                    }
                    isLastIndex={
                      collectiveInvoice?.length <= 2
                        ? false
                        : index === collectiveInvoice?.length - 1
                    }
                  />
                </span>
                <span className="py-4" onClick={(e) => e.stopPropagation()}>
                  <DropDown
                    items={Object.keys(staticEnums["InvoiceStatus"])
                      ?.slice(0, -1)
                      ?.map((item, index) => ({
                        item: {
                          label: invoiceStatus[index],
                          value: item,
                        },
                      }))}
                    selectedItem={translate(
                      `invoice_status.${item.invoiceStatus}`
                    )}
                    onItemSelected={(status) => {
                      if (status !== "Paid") {
                        handleInvoiceStatusUpdate(item.id, status, "reciept");
                      }
                    }}
                    dropDownClassName={`${
                      staticEnums["InvoiceStatus"][item.invoiceStatus] === 0
                        ? "bg-[#45C769]"
                        : staticEnums["InvoiceStatus"][item.invoiceStatus] === 2
                        ? "bg-[#4A13E7]"
                        : "bg-red"
                    } w-full !py-[3px] rounded-lg flex items-center justify-center gap-x-1`}
                    dropDownTextClassName="text-white text-base font-medium"
                    dropDownIconClassName={`text-[#fff]`}
                    dropDownItemsContainerClassName="w-fit"
                    key={item.id}
                    isSecondLastIndex={
                      collectiveInvoice?.length <= 2
                        ? false
                        : index === collectiveInvoice?.length - 2
                    }
                    isLastIndex={
                      collectiveInvoice?.length <= 2
                        ? false
                        : index === collectiveInvoice?.length - 1
                    }
                  />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-[minmax(50px,_50px),_minmax(50px,_50px)]">
              <span
                title={translate("common.mail")}
                className="py-3 flex justify-center items-center cursor-pointer"
              >
                <span className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="29"
                    height="29"
                    viewBox="0 0 29 29"
                    fill="none"
                  >
                    <path
                      opacity="1"
                      d="M1.12891 4.34055C1.12891 2.59917 2.54057 1.1875 4.28195 1.1875H24.7768C26.5181 1.1875 27.9298 2.59917 27.9298 4.34055V24.8354C27.9298 26.5767 26.5181 27.9884 24.7768 27.9884H4.28195C2.54057 27.9884 1.12891 26.5767 1.12891 24.8354V4.34055Z"
                      stroke={`${getMailStatusColor(item?.mail?.mailStatus)}`}
                    />
                    <path
                      d="M14.4499 16.1375C15.3211 16.1375 16.0273 15.4299 16.0273 14.557C16.0273 13.6842 15.3211 12.9766 14.4499 12.9766C13.5788 12.9766 12.8726 13.6842 12.8726 14.557C12.8726 15.4299 13.5788 16.1375 14.4499 16.1375Z"
                      fill={`${getMailStatusColor(item?.mail?.mailStatus)}`}
                    />
                    <path
                      d="M6.66915 15.0562C7.70759 16.36 10.7966 19.837 14.4508 19.837C18.1051 19.837 21.1941 16.3602 22.2325 15.0562C22.4559 14.7664 22.4559 14.3581 22.2325 14.0817C21.1941 12.7778 18.1051 9.30082 14.4508 9.30082C10.7966 9.28765 7.70759 12.7646 6.66915 14.0685C6.43255 14.3583 6.43255 14.7664 6.66915 15.0562ZM14.4508 11.3949C16.1991 11.3949 17.6056 12.8041 17.6056 14.5558C17.6056 16.3075 16.1991 17.7167 14.4508 17.7167C12.7026 17.7167 11.2961 16.3075 11.2961 14.5558C11.2961 12.8041 12.7026 11.3949 14.4508 11.3949Z"
                      fill={`${getMailStatusColor(item?.mail?.mailStatus)}`}
                    />
                  </svg>
                </span>
              </span>

              <span
                className="flex justify-center items-center cursor-pointer"
                onClick={() => handleReceiptPreview(item?.id)}
              >
                <div
                  title={translate("contracts.table_headings.edit")}
                  className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg"
                >
                  <span className="p-[5px] rounded-md w-[27px] h-[27px] border border-primary flex justify-center items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="15"
                      viewBox="0 0 8 15"
                      fill="#4A13E7"
                    >
                      <path
                        d="M0.461667 14.0074C0.291259 13.8244 0.206055 13.6078 0.206055 13.3575C0.206055 13.1072 0.291259 12.8908 0.461667 12.7084L5.45463 7.34757L0.444626 1.96849C0.285579 1.79773 0.206055 1.58427 0.206055 1.32813C0.206055 1.07198 0.291259 0.852424 0.461667 0.669462C0.632076 0.4865 0.833839 0.39502 1.06696 0.39502C1.30008 0.39502 1.50161 0.4865 1.67157 0.669462L7.39729 6.83528C7.46545 6.90846 7.51385 6.98775 7.54247 7.07313C7.5711 7.15851 7.58519 7.24999 7.58474 7.34757C7.58474 7.44515 7.57042 7.53663 7.54179 7.62201C7.51316 7.7074 7.465 7.78668 7.39729 7.85986L1.65453 14.0257C1.49548 14.1964 1.29939 14.2818 1.06628 14.2818C0.833157 14.2818 0.631621 14.1903 0.461667 14.0074Z"
                        fill="#4A13E7"
                      />
                    </svg>
                  </span>
                </div>
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TableRows;
