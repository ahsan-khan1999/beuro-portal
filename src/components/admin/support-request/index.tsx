import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRow from "./table/TableRow";
import useSupportRequest from "@/hooks/admin/support-request/useSupportRequest";
import { useAdminEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";

export default function SupportRequest() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    filter,
    setFilter,
    handleFilterChange,
    loading,
    currentPage,
    handleStatusChange,
    renderModal,
    totalCount,
  } = useSupportRequest();

  const CurrentComponent = useAdminEmptyStates(
    <TableRow
      currentPageRows={currentPageRows}
      onStatusChange={handleStatusChange}
    />,
    totalCount !== 0,
    loading
  );

  return (
    <Layout>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />

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
