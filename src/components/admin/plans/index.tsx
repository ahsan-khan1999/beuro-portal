import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRow from "./table/TableRow";
import usePlans from "@/hooks/admin/plans/usePlans";
import { useEmptyStates } from "@/utils/hooks";

export default function Plans() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    filter,
    handleFilterChange,
    loading,
    setFilter,
    handleDelete,
    renderModal,
  } = usePlans();

  const CurrentComponent = useEmptyStates(
    <TableRow currentPageRows={currentPageRows} handleDelete={handleDelete} />,
    currentPageRows?.length > 0,
    loading
  );

  return (
    <Layout>
      <TableFunctions />
      <TableLayout>
        <TableHeading />
        {CurrentComponent}
      </TableLayout>
      {currentPageRows?.length > 0 && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}
      {renderModal()}
    </Layout>
  );
}
