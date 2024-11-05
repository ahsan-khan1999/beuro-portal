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
