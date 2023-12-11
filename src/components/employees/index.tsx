import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableRows from "./table/TableRows";
import TableHeadings from "./table/TableHeadings";
import TableFunctions from "./table/TableFunctions";
import useEmployee from "@/hooks/employee/useEmployee";

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
          <TableRows employsData={currentPageRows} />
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
