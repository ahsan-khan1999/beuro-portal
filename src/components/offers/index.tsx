import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeadings";
import TableRows from "./table/TableRows";
import useOffers from "@/hooks/offers/useOffers";
import { useEmptyStates } from "@/utils/hooks";

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
    loading,
    renderModal,
    setFilter,
    totalItems,
  } = useOffers();

  const CurrentComponent = useEmptyStates(
    <TableRows
      dataToAdd={currentPageRows}
      openModal={handleNotes}
      handleImageUpload={handleImageUpload}
      handleOfferStatusUpdate={handleOfferStatusUpdate}
      handlePaymentStatusUpdate={handlePaymentStatusUpdate}
    />,
    currentPageRows?.length > 0,
    isLoading
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
