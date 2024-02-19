import React from "react";
import TableLayout from "@/layout/TableLayout";
import TableHeadings from "@/components/contract/table/TableHeading";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import useContract from "@/hooks/contract/useContract";
import { useEmptyStates } from "@/utils/hooks";
import TableRows from "@/components/contract/table/TableRows";

export default function ContractDetailsTable() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    handleImageUpload,
    handleNotes,
    renderModal,
    loading,
  } = useContract();

  // const CurrentComponent = useEmptyStates(
  //   <TableRows
  //     dataToAdd={currentPageRows}
  //     handleImageUpload={handleImageUpload}
  //     openModal={handleNotes}

  //   />,
  //   currentPageRows.length > 0,
  //   loading
  // );

  return (
    <>
      <TableLayout>
        <TableHeadings />
        {/* {CurrentComponent} */}
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
