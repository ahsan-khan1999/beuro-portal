import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRow from "./table/TableRow";
import useSupportRequest from "@/hooks/admin/support-request/useSupportRequest";
import { useEmptyStates } from "@/utils/hooks";

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
    currentPage

  } = useSupportRequest();

  const CurrentComponent = useEmptyStates(
    <TableRow currentPageRows={currentPageRows} />,
    currentPageRows?.length > 0,
    loading
  );

  return (
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
        currentPage={currentPage}

      />
    </Layout>
  );
}
