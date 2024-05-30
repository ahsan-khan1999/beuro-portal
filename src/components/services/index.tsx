import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableRowServices from "./table/TableRows";
import TableFunctions from "./table/TableFunctions";
import useService from "@/hooks/services/useService";
import TableHeadings from "./table/TableHeadings";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";

export default function Services() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    filter,
    setFilter,
    handleFilterChange,
    translate,
    loading,
    isLoading,
    currentPage,
    totalCount,
  } = useService();

  const CurrentComponent = useEmptyStates(
    <TableRowServices servicesData={currentPageRows} />,
    // currentPageRows.length > 0,
    totalCount !== 0,
    isLoading
  );

  return (
    <>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
        translate={translate}
      />
      <TableCardLayout>
        <TableLayout>
          <TableHeadings />
          {CurrentComponent}
        </TableLayout>
      </TableCardLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
    </>
  );
}
