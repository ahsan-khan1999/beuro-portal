import React from "react";
import TableLayout from "@/layout/TableLayout";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRows from "./table/TableRows";
import useInvoice from "@/hooks/invoice/useInvoice";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";
import { Button } from "@/base-components/ui/button/button";
import addIcon from "@/assets/svgs/plus_icon.svg";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import { InvoiceCard } from "@/base-components/ui/invoice-card";

export default function Invoices() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    handleNotes,
    renderModal,
    filter,
    loading,
    isLoading,
    setFilter,
    handleFilterChange,
    currentPage,
    invoiceSum,
    translate,
    handleDownloadInvoiceReport,
    totalCount,
    router,
  } = useInvoice();

  const CurrentComponent = useEmptyStates(
    <TableRows dataToAdd={currentPageRows} handleNotes={handleNotes} />,
    totalCount !== 0,
    isLoading
  );

  return (
    <>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
        onCSVDownload={handleDownloadInvoiceReport}
      />

      <div className="bg-white pt-[18px] pl-5 pr-[15px] pb-[34px] mt-10 mb-5">
        <div className="flex items-center justify-between border-b border-b-[#000] border-opacity-10 pb-5">
          <h1 className="text-2xl font-semibold text-[#222B45]">
            {translate("invoice.main_heading")}
          </h1>

          <Button
            inputType="button"
            onClick={() => router.push("/invoices/create-invoice")}
            className="gap-x-2 !h-fit py-3 p-4 w-[175px] flex items-center text-[13px] font-semibold bg-primary text-white rounded-md whitespace-nowrap"
            text={translate("common.create_invoice")}
            id="add"
            icon={addIcon}
            iconAlt="add button"
          />
        </div>

        <div className="grid xs:grid-cols-[repeat(2,1fr)] mlg:grid-cols-[repeat(3,1fr)] xlg:grid-cols-[repeat(4,1fr)] xLarge:grid-cols-[repeat(5,1fr)] xMaxLarge:grid-cols-[repeat(6,1fr)] xMaxProLarge:grid-cols-[repeat(7,1fr)] items-center pt-6 gap-3">
          <InvoiceCard
            heading={translate("common.invoice_cards.open_invoice")}
            value={invoiceSum?.sumOfOpenInvoices || 0}
            className="bg-primary"
          />
          <InvoiceCard
            heading={translate("common.invoice_cards.paid_invoice")}
            value={invoiceSum?.sumOfPaidInvoices || 0}
            className="bg-[#45C769]"
          />
          <InvoiceCard
            heading={translate("common.invoice_cards.overdue_invoice")}
            value={invoiceSum?.sumOfOverdueInvoices || 0}
            className="bg-[#FF0000]"
          />
          <InvoiceCard
            heading={translate("common.invoice_cards.sending_invoice")}
            value={invoiceSum?.sumOfSendingInvoices || 0}
            className="bg-[#7B18FF]"
          />
          <InvoiceCard
            heading={translate("common.invoice_cards.pending_invoice")}
            value={invoiceSum?.sumOfPendingInvoices || 0}
            className="bg-[#FE9244]"
          />
          <InvoiceCard
            heading={translate("common.invoice_cards.page_sum")}
            value={invoiceSum?.sumOfAllPages || 0}
            className="bg-[#FF376F]"
          />
          <InvoiceCard
            heading={translate("common.invoice_cards.invoice_total")}
            value={invoiceSum?.sumOfTotalsPerPage || 0}
            className="bg-[#4A13E7]"
          />
        </div>
      </div>

      {/* <div className="flex justify-center items-center gap-x-5 my-5">
        <div className="bg-white shadow-lg px-6 py-3 flex flex-col gap-y-1 items-center">
          <span className="text-base font-medium">
            {translate("common.invoice_total")}
          </span>
          <span className="font-semibold">{invoiceSum?.sumOfAllPages} CHf</span>
        </div>

        <div className="bg-white shadow-lg px-5 py-3 flex flex-col gap-y-1 items-center">
          <span className="text-base font-medium">
            {translate("common.page_sum")}
          </span>
          <span className="font-semibold">
            {invoiceSum?.sumOfTotalsPerPage} CHf
          </span>
        </div>
      </div> */}

      {/* <div className="flex items-center justify-end mb-3">
        <BaseButton
          buttonText={translate("common.CSV_button")}
          onClick={handleDownloadInvoiceReport}
          containerClassName={`flex items-center group gap-x-3 row-reverse bg-primary hover:bg-buttonHover`}
          textClassName={`text-white font-medium`}
          loading={loading}
          loaderColor="#4A13E7"
        >
          <CSVIcon className="text-white group-hover:text-white" />
        </BaseButton>
      </div> */}

      <TableCardLayout>
        <TableLayout>
          <TableHeading />
          {CurrentComponent}
        </TableLayout>
      </TableCardLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      {renderModal()}
    </>
  );
}
