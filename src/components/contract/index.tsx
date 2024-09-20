import React from "react";
import TableLayout from "@/layout/TableLayout";
import TableHeadings from "@/components/contract/table/TableHeading";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableRows from "./table/TableRows";
import useContract from "@/hooks/contract/useContract";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";

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
    isLoading,
    handleContractStatusUpdate,
    handlePaymentStatusUpdate,
    currentPage,
    totalCount,
    handleTaskCreation,
  } = useContract();

  const CurrentComponent = useEmptyStates(
    <TableRows
      dataToAdd={currentPageRows}
      handleImageUpload={handleImageUpload}
      handleNotes={handleNotes}
      handlePaymentStatusUpdate={handlePaymentStatusUpdate}
      handleContractStatusUpdate={handleContractStatusUpdate}
      onTaskCreate={handleTaskCreation}
    />,
    totalCount !== 0,
    isLoading
  );

  return (
    <>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />

      <TableCardLayout>
        <TableLayout>
          <TableHeadings />
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
