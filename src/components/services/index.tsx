import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableRowServices from "./table/TableRows";
import TableFunctions from "./table/TableFunctions";
import useService from "@/hooks/services/useService";
import TableHeadings from "./table/TableHeadings";
import { useEmptyStates } from "@/utils/hooks";

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
  } = useService();

  const CurrentComponent = useEmptyStates(
    <TableRowServices servicesData={currentPageRows} />,
    currentPageRows.length > 0,
    loading
  );

  return (
    <>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
        translate={translate}
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
    </>
  );
}
