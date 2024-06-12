import React from "react";
import { SubInvoiceTableRowTypes } from "@/types/invoice";
import { useRouter } from "next/router";
import { formatDateTimeToDate, getInvoiceEmailColor } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import { useAppSelector } from "@/hooks/useRedux";
import { DropDown } from "@/base-components/ui/dropDown/drop-down";
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

  const { t: translate } = useTranslation();
  const { systemSettings } = useAppSelector((state) => state.settings);

  const handleInvoicePdfPreview = (id?: string) => {
    router.push({
      pathname: "/invoices/invoice-pdf-preview",
      query: {
        ...router.query,
        tab: "invoice",
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
        dataToAdd && dataToAdd.length <= 4 ? "h-[550px]" : ""
      }`}
    >
      {collectiveInvoice?.map((item, index: number) => {
        return (
          <div className="flex">
            <div className="mlg:w-full">
              <div
                key={index}
                onClick={() => handleInvoicePdfPreview(item?.id)}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                } pl-4 pr-1 cursor-pointer hover:bg-[#E9E1FF] rounded-md gap-x-3 items-center xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(100px,_100px),minmax(200px,_4fr)_minmax(200px,_3fr)_minmax(200px,_200px)_minmax(100px,_100px)_minmax(170px,_170px)_minmax(140px,_140px)_minmax(150px,_150px)] mlg:grid-cols-[minmax(80px,_80px)_minmax(100px,_3fr)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(110px,_110px)] xlg:grid-cols-[minmax(80px,_80px)_minmax(100px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(130px,_130px)] maxSize:grid-cols-[minmax(80px,_80px)_minmax(100px,_3fr)_minmax(130px,_130px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(130px,_130px)] xMaxSize:grid-cols-[minmax(80px,_80px),minmax(80px,_4fr)_minmax(120px,_3fr)_minmax(80px,_80px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)] xLarge:grid-cols-[minmax(80px,_80px),minmax(100px,_3fr)_minmax(130px,_4fr)_minmax(150px,_150px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)] xMaxLarge:grid-cols-[minmax(80px,_80px),minmax(100px,_3fr)_minmax(130px,_4fr)_minmax(150px,_150px)_minmax(80px,_80px)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)] border-t border-t-[#E7EAEE]`}
              >
                <span className="py-4 truncate">{item.invoiceNumber}</span>

                <div className="flex items-center gap-x-1">
                  {(item.invoiceID?.customerDetail
                    ?.customerType as keyof (typeof staticEnums)["CustomerType"]) ===
                  1 ? (
                    <span className="py-4 truncate text-lg font-medium text-primary">
                      {item.invoiceID?.customerDetail?.companyName}
                    </span>
                  ) : (
                    <span className="py-4 truncate">
                      {item.invoiceID?.customerDetail?.fullName}
                    </span>
                  )}
                </div>
                {/* <span className="py-4 truncate">
                  {item.invoiceID?.customerDetail?.fullName}
                </span> */}
                <span className="py-4 truncate mlg:hidden xMaxSize:block">
                  {item?.invoiceID?.content?.contentName}
                </span>
                <span className="py-4 truncate mlg:hidden xMaxLarge:block">
                  {formatDateTimeToDate(item.createdAt)}
                </span>
                <span className="py-4 truncate mlg:hidden maxSize:block">
                  {item.amount + " " + systemSettings?.currency}
                </span>

                <div className="py-4">
                  <span
                    style={{
                      backgroundColor: `${getInvoiceEmailColor(
                        item.emailStatus
                      )}`,
                    }}
                    className="text-white px-2 flex justify-center items-center py-1 text-center rounded-md text-sm min-w-[70px] w-full"
                  >
                    {translate(`email_status.${item?.emailStatus}`)}
                  </span>
                </div>

                <span className="py-4" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center">
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
                        handlePaymentStatusUpdate(item.id, status, "invoice");
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
                        dataToAdd?.length <= 2
                          ? false
                          : index === dataToAdd?.length - 2
                      }
                      isLastIndex={
                        dataToAdd?.length <= 2
                          ? false
                          : index === dataToAdd?.length - 1
                      }
                    />
                  </div>
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
                      if (item.invoiceStatus !== status) {
                        handleInvoiceStatusUpdate(item.id, status, "invoice");
                      }
                    }}
                    dropDownClassName={`${
                      staticEnums["InvoiceStatus"][item.invoiceStatus] === 0
                        ? "bg-[#45C769]"
                        : staticEnums["InvoiceStatus"][item.invoiceStatus] === 2
                        ? "bg-[#4A13E7]"
                        : "bg-red"
                    } w-full rounded-lg !py-[3px] flex items-center justify-center gap-x-1`}
                    key={item.id}
                    dropDownTextClassName="text-white text-base font-medium"
                    dropDownIconClassName={`text-[#fff]`}
                    dropDownItemsContainerClassName="w-full"
                    isSecondLastIndex={
                      dataToAdd?.length <= 2
                        ? false
                        : index === dataToAdd?.length - 2
                    }
                    isLastIndex={
                      dataToAdd?.length <= 2
                        ? false
                        : index === dataToAdd?.length - 1
                    }
                  />
                </span>
              </div>
            </div>

            <div className="grid grid-cols-[minmax(50px,_50px),_minmax(50px,_50px),_minmax(50px,_50px)]">
              <div
                className="py-3 flex justify-center items-center cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  if (!invoiceDetails?.isInvoiceRecurring) {
                    handleInvoiceEdit(item);
                  } else {
                    handleRecurringInvoiceEdit(item);
                  }
                }}
                title={translate("contracts.table_headings.edit")}
              >
                {/* <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg"> */}
                <span className="p-[5px] border border-primary rounded-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.8694 2.52921C12.2787 2.1441 12.8246 1.93506 13.3849 1.93506C13.9453 1.93506 14.4912 2.1441 14.9005 2.52921L14.9005 2.52929L15.0224 2.64396L15.0225 2.64403C15.4332 3.03072 15.6731 3.56517 15.6731 4.13277C15.6731 4.70037 15.4332 5.23482 15.0225 5.62151L15.0224 5.62159L13.9028 6.67529C13.8999 6.67806 13.897 6.68081 13.8941 6.68352L6.81563 13.3456C6.71969 13.4359 6.60165 13.4993 6.47339 13.5295L3.64006 14.1962C3.38351 14.2565 3.11411 14.1778 2.93043 13.9888C2.74675 13.7998 2.67575 13.5283 2.74341 13.2736L3.45175 10.6069C3.48767 10.4717 3.5607 10.3492 3.66259 10.2533L10.742 3.59029C10.7449 3.5875 10.7479 3.58473 10.7508 3.582L11.8693 2.52929L11.8694 2.52921ZM11.2599 5.16271L4.84652 11.1989L4.51432 12.4495L5.93405 12.1154L12.2906 6.13277L11.2599 5.16271ZM13.3849 5.10284L12.3543 4.13277L12.8973 3.62167C12.8973 3.62164 12.8974 3.62162 12.8974 3.62159C13.0194 3.50683 13.194 3.43506 13.3849 3.43506C13.5759 3.43506 13.7505 3.50683 13.8725 3.62159C13.8725 3.62162 13.8726 3.62164 13.8726 3.62167L13.9943 3.73618C14.1147 3.84956 14.1731 3.99327 14.1731 4.13277C14.1731 4.27225 14.1147 4.41592 13.9943 4.52929C13.9943 4.52932 13.9943 4.52934 13.9943 4.52937L13.3849 5.10284ZM9.09328 13.4661C9.09328 13.0519 9.42906 12.7161 9.84328 12.7161H15.5099C15.9242 12.7161 16.2599 13.0519 16.2599 13.4661C16.2599 13.8803 15.9242 14.2161 15.5099 14.2161H9.84328C9.42906 14.2161 9.09328 13.8803 9.09328 13.4661Z"
                      fill="#4A13E7"
                    />
                  </svg>
                </span>
                {/* </div> */}
              </div>

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
                      // stroke={`${getMailStatusColor(item?.mail?.mailStatus)}`}
                      stroke={`${
                        item?.mail?.mailStatus === 0
                          ? "#FE9244"
                          : item?.mail?.mailStatus === 1
                          ? "#45C769"
                          : "#FE9244"
                      }`}
                    />
                    <path
                      d="M14.4499 16.1375C15.3211 16.1375 16.0273 15.4299 16.0273 14.557C16.0273 13.6842 15.3211 12.9766 14.4499 12.9766C13.5788 12.9766 12.8726 13.6842 12.8726 14.557C12.8726 15.4299 13.5788 16.1375 14.4499 16.1375Z"
                      // fill={`${getMailStatusColor(item?.mail?.mailStatus)}`}
                      fill={`${
                        item?.mail?.mailStatus === 0
                          ? "#FE9244"
                          : item?.mail?.mailStatus === 1
                          ? "#45C769"
                          : "#FE9244"
                      }`}
                    />
                    <path
                      d="M6.66915 15.0562C7.70759 16.36 10.7966 19.837 14.4508 19.837C18.1051 19.837 21.1941 16.3602 22.2325 15.0562C22.4559 14.7664 22.4559 14.3581 22.2325 14.0817C21.1941 12.7778 18.1051 9.30082 14.4508 9.30082C10.7966 9.28765 7.70759 12.7646 6.66915 14.0685C6.43255 14.3583 6.43255 14.7664 6.66915 15.0562ZM14.4508 11.3949C16.1991 11.3949 17.6056 12.8041 17.6056 14.5558C17.6056 16.3075 16.1991 17.7167 14.4508 17.7167C12.7026 17.7167 11.2961 16.3075 11.2961 14.5558C11.2961 12.8041 12.7026 11.3949 14.4508 11.3949Z"
                      // fill={`${getMailStatusColor(item?.mail?.mailStatus)}`}
                      fill={`${
                        item?.mail?.mailStatus === 0
                          ? "#FE9244"
                          : item?.mail?.mailStatus === 1
                          ? "#45C769"
                          : "#FE9244"
                      }`}
                    />
                  </svg>
                </span>
              </span>
              <span
                className="flex justify-center items-center cursor-pointer"
                onClick={() => handleInvoicePdfPreview(item?.id)}
              >
                <div
                  title={translate("contracts.table_headings.edit")}
                  className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg"
                >
                  <div className="p-[5px] rounded-md w-[27px] h-[27px] border border-primary flex justify-center items-center">
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
                  </div>
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
