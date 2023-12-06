import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import TableHeadings from "@/components/contract/table/TableHeading";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableRows from "./table/TableRows";
import useLeads from "@/hooks/leads/useLeads";
import useContract from "@/hooks/contract/useContract";

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

  return (
    <>
      <Layout>
        <TableFunctions filter={filter} setFilter={setFilter} handleFilterChange={handleFilterChange}/>
        <TableLayout>
          <TableHeadings />
          <TableRows dataToAdd={currentPageRows}  handleImageUpload={handleImageUpload} openModal={handleNotes}/>
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
