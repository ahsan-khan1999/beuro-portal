import React from "react";
import { useRouter } from "next/router";
import { InvoiceTableRowTypes } from "@/types/invoice";
import { getInvoiceStatusColor } from "@/utils/utility";
import { staticEnums } from "@/utils/static";
import { formatDateString } from "@/utils/functions";
import { useTranslation } from "next-i18next";
import { AddNoteIcon } from "@/assets/svgs/components/add-note-icon";
import { EditIcon } from "@/assets/svgs/components/edit-icon";
const TableRows = ({
  dataToAdd,
  handleNotes,
}: {
  dataToAdd: InvoiceTableRowTypes[];
  handleNotes: (
    id: string,
    refId: string,
    name: string,
    heading: string,
    e?: React.MouseEvent<HTMLSpanElement>
  ) => void;
}) => {
  const router = useRouter();
  const { t: translate } = useTranslation();
  const handleInvoicePdfPreview = (id?: string) => {
    router.push({
      pathname: "/invoices/pdf-preview",
      query: {
        ...router.query,
        invoice: id,
        isMail: true,
      },
    });
  };

  return (
    <div>
      {dataToAdd?.map((item, index: number) => {
        const customerType = item?.customerDetail
          ?.customerType as keyof (typeof staticEnums)["CustomerType"];
        const name =
          customerType === 1
            ? item?.customerDetail?.companyName
            : item?.customerDetail?.fullName;

        const heading =
          customerType === 1
            ? translate("common.company_name")
            : translate("common.customer_name");

        return (
          <div className="flex" key={index}>
            <div className="mlg:w-full">
              <div
                key={index}
                onClick={() => handleInvoicePdfPreview(item?.id)}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-tableRowBg"
                } pl-4 pr-1 cursor-pointer hover:bg-[#E9E1FF] rounded-md gap-x-3 items-center xs:w-fit xlg:w-auto mlg:w-full grid xs:grid-cols-[minmax(90px,_90px)_minmax(400px,_5fr)_minmax(250px,_4fr)_minmax(150px,_150px)_minmax(150px,_150px)_minmax(130px,_130px)_minmax(140px,_140px)_minmax(110px,_110px)] mlg:grid-cols-[minmax(70px,_70px)_minmax(100px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(130px,_130px)] xlg:grid-cols-[minmax(70px,_70px),minmax(120px,_3fr)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(120px,_120px)] maxSize:grid-cols-[minmax(70px,_70px),minmax(80px,_4fr)_minmax(110px,_3fr)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(100px,_100px)_minmax(100px,_100px)] xMaxSize:grid-cols-[minmax(70px,_70px),minmax(80px,_4fr)_minmax(110px,_3fr)_minmax(130px,_130px)_minmax(120px,_120px)_minmax(130px,_130px)_minmax(100px,_100px)_minmax(100px,_100px)] ${
                  index !== 0 && "border-t border-t-[#E7EAEE]"
                } ${index === 0 && "mt-2"}`}
              >
                <span className="py-4 truncate">{item.invoiceNumber}</span>
                <div className="flex items-center gap-x-1">
                  {(item?.customerDetail
                    ?.customerType as keyof (typeof staticEnums)["CustomerType"]) ===
                  1 ? (
                    <span className="py-4 truncate text-lg font-medium text-primary">
                      {item?.customerDetail?.companyName}
                    </span>
                  ) : (
                    <span className="py-4 truncate">
                      {item?.customerDetail?.fullName}
                    </span>
                  )}
                </div>
                <span className="py-4 mlg:hidden maxSize:block truncate">
                  {item?.content?.contentName}
                </span>
                <span className="py-4 mlg:hidden maxSize:block truncate">
                  {formatDateString(item.date[0].startDate)}
                </span>
                <span className="py-4 truncate mlg:hidden xMaxSize:block">
                  {item?.total}
                </span>

                <span className="py-4 flex justify-center items-center">
                  <div
                    className={`${
                      item.sentEmail === item.totalEmail
                        ? "bg-[#FE9244]"
                        : "bg-[#4A13E7]"
                    } text-white px-2 py-2 text-center rounded-md w-full text-sm`}
                  >
                    {item.sentEmail + "/" + item.totalEmail + " Sent"}
                  </div>
                </span>
                <div className="py-4 flex justify-center items-center">
                  <span
                    className={`bg-[#4A13E7] text-white px-2 py-2 rounded-tl-md rounded-bl-md text-center text-sm overflow-hidden max-w-[100px]`}
                  >
                    {!Number.isInteger(item?.paidAmount)
                      ? Number(item?.paidAmount)?.toFixed(2)
                      : item?.paidAmount}
                  </span>
                  <span
                    className={`bg-[#EDE7FD] text-[#393939] px-2 py-2 rounded-tr-md rounded-br-md text-center text-sm overflow-hidden max-w-[100px]`}
                  >
                    {!Number.isInteger(item?.remainingAmount)
                      ? Number(item?.remainingAmount)?.toFixed(2)
                      : item?.remainingAmount}
                  </span>
                </div>

                <span className="py-4 flex justify-center items-center">
                  <div
                    className={`bg-[${getInvoiceStatusColor(
                      item.invoiceStatus
                    )}] text-white px-2 py-2 text-center rounded-md min-w-[70px] w-full text-sm`}
                  >
                    {translate(`invoice_status.${item.invoiceStatus}`)}
                  </div>
                </span>
              </div>
            </div>

            <div
              className={`grid items-center grid-cols-[minmax(50px,_50px)_minmax(50px,_50px)] ${
                index === 0 && "mt-2"
              }`}
            >
              <span
                onClick={(e) =>
                  handleNotes(item?.id, item?.invoiceNumber, name, heading, e)
                }
                title={translate("contracts.table_headings.notes")}
                className="py-3 cursor-pointer flex justify-center items-center"
              >
                <span className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <AddNoteIcon isNoteCreated={item?.isNoteCreated} />
                  {/* <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                  >
                    <rect
                      x="1.03711"
                      y="0.69043"
                      width="31.1684"
                      height="31"
                      rx="7.5"
                      fill="white"
                      stroke={item?.isNoteCreated ? "#FF0000" : "#4A13E7"}
                    />
                    <path
                      d="M20.0838 15.499C20.0838 15.1576 19.8071 14.8809 19.4657 14.8809H13.0991C12.7577 14.8809 12.481 15.1576 12.481 15.499C12.481 15.8404 12.7577 16.1171 13.0991 16.1171H19.4657C19.8071 16.1171 20.0838 15.8404 20.0838 15.499Z"
                      fill={item?.isNoteCreated ? "#FF0000" : "#4A13E7"}
                    />
                    <path
                      d="M13.0991 17.3535C12.7577 17.3535 12.481 17.6302 12.481 17.9716C12.481 18.313 12.7577 18.5897 13.0991 18.5897H16.9657C17.3071 18.5897 17.5838 18.313 17.5838 17.9716C17.5838 17.6302 17.3071 17.3535 16.9657 17.3535H13.0991Z"
                      fill={item?.isNoteCreated ? "#FF0000" : "#4A13E7"}
                    />
                    <path
                      d="M14.5505 23.2877H12.4832C11.8015 23.2877 11.247 22.7332 11.247 22.0515V11.1727C11.247 10.491 11.8015 9.93643 12.4832 9.93643H20.0826C20.7643 9.93643 21.3188 10.491 21.3188 11.1727V14.9741C21.3188 15.3155 21.5956 15.5922 21.937 15.5922C22.2783 15.5922 22.5551 15.3155 22.5551 14.9741V11.1727C22.5551 9.80934 21.4459 8.7002 20.0826 8.7002H12.4832C11.1199 8.7002 10.0107 9.80934 10.0107 11.1727V22.0515C10.0107 23.4148 11.1199 24.524 12.4832 24.524H14.5505C14.8919 24.524 15.1686 24.2472 15.1686 23.9059C15.1686 23.5645 14.8919 23.2877 14.5505 23.2877Z"
                      fill={item?.isNoteCreated ? "#FF0000" : "#4A13E7"}
                    />
                    <path
                      d="M23.6495 17.6498C22.9265 16.9267 21.7501 16.9267 21.0275 17.6493L17.634 21.0353C17.5619 21.1072 17.5087 21.1958 17.4791 21.2932L16.7401 23.7263C16.6746 23.942 16.7316 24.1762 16.8891 24.3376C17.007 24.4585 17.1672 24.5241 17.3316 24.5241C17.3865 24.5241 17.442 24.5167 17.4965 24.5016L19.9914 23.8105C20.0941 23.7821 20.1877 23.7276 20.2631 23.6523L23.6495 20.2722C24.3725 19.5492 24.3725 18.3728 23.6495 17.6498ZM19.5048 22.6626L18.2496 23.0102L18.6169 21.8009L20.9067 19.5162L21.781 20.3905L19.5048 22.6626ZM22.7758 19.3977L22.656 19.5172L21.7819 18.6431L21.9012 18.524C22.1422 18.283 22.5344 18.283 22.7754 18.524C23.0164 18.765 23.0164 19.1571 22.7758 19.3977Z"
                      fill={item?.isNoteCreated ? "#FF0000" : "#4A13E7"}
                    />
                    <path
                      d="M19.4657 12.4092H13.0991C12.7577 12.4092 12.481 12.6859 12.481 13.0273C12.481 13.3687 12.7577 13.6454 13.0991 13.6454H19.4657C19.8071 13.6454 20.0838 13.3687 20.0838 13.0273C20.0838 12.6859 19.8071 12.4092 19.4657 12.4092Z"
                      fill={item?.isNoteCreated ? "#FF0000" : "#4A13E7"}
                    />
                  </svg> */}
                </span>
              </span>
              <span
                onClick={(e) => e.stopPropagation()}
                title={translate("contracts.table_headings.edit")}
                className="cursor-pointer flex justify-center items-center"
              >
                <div className="hover:bg-[#E9E1FF] p-1 rounded-lg hover:shadow-lg">
                  <div
                    onClick={() =>
                      router.push({
                        pathname: "/invoices/details",
                        query: { ...router.query, invoice: item.id },
                      })
                    }
                    className="p-[5px] rounded-md w-[32px] h-[32px] border border-primary flex justify-center items-center"
                  >
                    <EditIcon />
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
