import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRow from "./table/TableRow";
import usePlans from "@/hooks/admin/plans/usePlans";
import { useAdminEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";

export default function Plans() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    loading,
    handleDelete,
    renderModal,
    currentPage,
    totalCount,
  } = usePlans();

  const CurrentComponent = useAdminEmptyStates(
    <TableRow currentPageRows={currentPageRows} handleDelete={handleDelete} />,
    totalCount !== 0,
    loading
  );

  return (
    <Layout>
      <TableFunctions />
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
    </Layout>
  );
}
