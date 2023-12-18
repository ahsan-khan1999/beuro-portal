import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import TableHeadings from "@/components/contract/table/TableHeading";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableRows from "./table/TableRows";
import useLeads from "@/hooks/leads/useLeads";
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
  } = useContract();

  const CurrentComponent = useEmptyStates(
    <TableRows
      dataToAdd={currentPageRows}
      handleImageUpload={handleImageUpload}
      openModal={handleNotes}
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
          <TableHeadings />
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
