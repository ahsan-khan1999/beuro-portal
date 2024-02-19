import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import useOffers from "@/hooks/offers/useOffers";
import TableRows from "@/components/offers/table/TableRows";
import TableFunctions from "@/components/offers/table/TableFunctions";
import TableHeadings from "@/components/offers/table/TableHeadings";

export default function OffersDetailsTable({}) {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    handleNotes,
    handleImageUpload,
    renderModal,
  } = useOffers();

  return (
    <>
      <TableLayout>
        <TableHeadings />
        {/* <TableRows
          dataToAdd={currentPageRows}
          openModal={handleNotes}
          handleImageUpload={handleImageUpload}
        /> */}
        ,
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
