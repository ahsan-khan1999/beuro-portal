import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRow from "./table/TableRow";
import usePlans from "@/hooks/admin/plans/usePlans";

export default function Plans() {
  const { currentPageRows, handlePageChange, totalItems, itemsPerPage, filter, handleFilterChange, loading, setFilter, handleDelete, renderModal } =
    usePlans();

  return (
    <Layout>
      <TableFunctions />
      <TableLayout>
        <TableHeading />
        <TableRow currentPageRows={currentPageRows} handleDelete={handleDelete} />
      </TableLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {renderModal()}
    </Layout>
  );
}
