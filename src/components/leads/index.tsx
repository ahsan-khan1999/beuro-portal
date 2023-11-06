import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableRows from "./table/TableRows";
import TableHeadings from "./table/TableHeadings";
import useLeads from "@/hooks/leads/useLeads";

export default function Leads() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    handleNotes,
    handleImageUpload,
    renderModal,
  } = useLeads();

  return (
    <>
      <Layout>
        <TableFunctions />
        <TableLayout>
          <TableHeadings />
          <TableRows dataToAdd={currentPageRows} openModal={handleNotes} handleImageUpload={handleImageUpload}/>
        </TableLayout>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
        {renderModal()}
      </Layout>
    </>
  );
}
