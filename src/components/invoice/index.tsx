import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRows from "./table/TableRows";
import useInvoice from "@/hooks/invoice/useInvoice";
import { useEmptyStates } from "@/utils/hooks";

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
    setFilter,
    handleFilterChange,
  } = useInvoice();

  const CurrentComponent = useEmptyStates(
    <TableRows dataToAdd={currentPageRows} handleNotes={handleNotes} />,
    currentPageRows.length > 0,
    loading
  );

  return (
    <>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
      <TableLayout>
        <TableHeading />
        {CurrentComponent}
      </TableLayout>
      {currentPageRows.length > 0 && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
      {renderModal()}
    </>
  );
}
