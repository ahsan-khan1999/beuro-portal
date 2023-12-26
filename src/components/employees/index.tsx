import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableRows from "./table/TableRows";
import TableHeadings from "./table/TableHeadings";
import TableFunctions from "./table/TableFunctions";
import useEmployee from "@/hooks/employee/useEmployee";
import { useEmptyStates } from "@/utils/hooks";

export default function Employees() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    filter,
    handleFilterChange,
    setFilter,
    translate,
    loading,
  } = useEmployee();

  const CurrentComponent = useEmptyStates(
    <TableRows employsData={currentPageRows} />,
    currentPageRows.length > 0,
    loading
  );

  return (
    <>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={() => console.log()}
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
