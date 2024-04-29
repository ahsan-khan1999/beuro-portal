import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRows from "./table/TableRows";
import useInvoice from "@/hooks/invoice/useInvoice";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";
import { BaseButton } from "@/base-components/ui/button/base-button";
import { CSVIcon } from "@/assets/svgs/components/csv-icon";

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
  } = useInvoice();

  const CurrentComponent = useEmptyStates(
    <TableRows dataToAdd={currentPageRows} handleNotes={handleNotes} />,
    currentPageRows.length > 0,
    isLoading
  );

  return (
    <>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />

      <div className="flex justify-center items-center gap-x-5 my-5">
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
      </div>

      <div className="flex items-center justify-end mb-3">
        <BaseButton
          buttonText={translate("common.CSV_button")}
          onClick={handleDownloadInvoiceReport}
          containerClassName="flex items-center group gap-x-3 row-reverse border border-primary"
          textClassName="text-[#4B4B4B] font-medium group-hover:text-primary"
          loading={loading}
          loaderColor="#4A13E7"
        >
          <CSVIcon className="text-primary group-hover:text-primary" />
        </BaseButton>
      </div>

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
