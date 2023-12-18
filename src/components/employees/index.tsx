import React from "react";
import { Layout } from "@/layout/layout";
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
  } = useEmployee();

  const CurrentComponent = useEmptyStates(
    <TableRows employsData={currentPageRows} />,
    currentPageRows.length > 0
  );

  return (
    <>
      <Layout>
        <TableFunctions
          filter={filter}
          setFilter={setFilter}
          handleFilterChange={handleFilterChange}
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
      </Layout>
    </>
  );
}
