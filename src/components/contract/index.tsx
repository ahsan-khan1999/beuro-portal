import React from "react";
import TableLayout from "@/layout/TableLayout";
import TableHeadings from "@/components/contract/table/TableHeading";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableRows from "./table/TableRows";
import useContract from "@/hooks/contract/useContract";
import { useEmptyStates } from "@/utils/hooks";

export default function Contract() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    handleImageUpload,
    handleNotes,
    renderModal,
    handleFilterChange,
    filter,
    setFilter,
    loading,
    handleContractStatusUpdate,
    handlePaymentStatusUpdate,
  } = useContract();

  const CurrentComponent = useEmptyStates(
    <TableRows
      dataToAdd={currentPageRows}
      handleImageUpload={handleImageUpload}
      openModal={handleNotes}
      handlePaymentStatusUpdate={handlePaymentStatusUpdate}
      handleContractStatusUpdate={handleContractStatusUpdate}
    />,
    currentPageRows.length > 0,
    loading
  );

  return (
    <div className="relative">
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
      <TableLayout>
        <TableHeadings />
        {CurrentComponent}
      </TableLayout>
      <div className="absolute right-0 bottom-6">
        {currentPageRows.length > 0 && (
          <Pagination
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      {renderModal()}
    </div>
  );
}
