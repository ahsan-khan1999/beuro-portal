import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRows from "./table/TableRows";
import useInvoice from "@/hooks/invoice/useInvoice";
import { useEmptyStates } from "@/utils/hooks";
import { useTranslation } from "next-i18next";

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
  } = useInvoice();

  const CurrentComponent = useEmptyStates(
    <TableRows dataToAdd={currentPageRows} handleNotes={handleNotes} />,
    currentPageRows.length > 0,
    isLoading
  );

  const { t: translate } = useTranslation();

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

      <TableLayout>
        <TableHeading />
        {CurrentComponent}
      </TableLayout>
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
