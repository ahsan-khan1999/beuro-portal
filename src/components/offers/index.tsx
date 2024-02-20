import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeadings";
import TableRows from "./table/TableRows";
import useOffers from "@/hooks/offers/useOffers";
import { useEmptyStates } from "@/utils/hooks";
import useOfferDetails from "@/hooks/offers/useOfferDetails";

export default function Offers() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    handleNotes,
    handleImageUpload,
    renderModal,
    filter,
    setFilter,
    handleFilterChange,
    loading,
    handleOfferStatusUpdate,
    handlePaymentStatusUpdate,
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
    loading
  );

  return (
    <div>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
      <TableLayout>
        <TableHeading />
        {CurrentComponent}
      </TableLayout>
      {/* <div className="absolute right-0 -bottom-24"> */}
      {currentPageRows.length > 0 && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
      {/* </div> */}
      {renderModal()}
    </div>
  );
}
