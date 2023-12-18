import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeadings";
import TableRows from "./table/TableRows";
import useOffers from "@/hooks/offers/useOffers";
import { useEmptyStates } from "@/utils/hooks";

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
  } = useOffers();

  const CurrentComponent = useEmptyStates(
    <TableRows
            dataToAdd={currentPageRows}
            openModal={handleNotes}
            handleImageUpload={handleImageUpload}
          />,
    currentPageRows.length > 0
  );

  return (
    <>
      <Layout>
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
        />
      </Layout>
      {renderModal()}
    </>
  );
}
