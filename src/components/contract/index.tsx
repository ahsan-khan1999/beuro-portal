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
    <div>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />

      <div className="relative">
        <TableLayout>
          <TableHeadings />

          {CurrentComponent}
        </TableLayout>
        <div className="absolute right-0 mt-1">
          {currentPageRows.length > 0 && (
            <Pagination
              totalItems={totalItems}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      {renderModal()}
    </div>
  );
}
