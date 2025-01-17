import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeadings";
import TableRows from "./table/TableRows";
import useOffers from "@/hooks/offers/useOffers";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";

export default function Offers() {
  const {
    currentPage,
    currentPageRows,
    filter,
    handleFilterChange,
    handleImageUpload,
    handleNotes,
    handleOfferStatusUpdate,
    handlePageChange,
    handlePaymentStatusUpdate,
    isLoading,
    itemsPerPage,
    renderModal,
    setFilter,
    totalItems,
    totalCount,
  } = useOffers();

  const CurrentComponent = useEmptyStates(
    <TableRows
      dataToAdd={currentPageRows}
      handleNotes={handleNotes}
      handleImageUpload={handleImageUpload}
      handleOfferStatusUpdate={handleOfferStatusUpdate}
      handlePaymentStatusUpdate={handlePaymentStatusUpdate}
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
