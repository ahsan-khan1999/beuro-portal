import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableRows from "./table/TableRows";
import TableHeadings from "./table/TableHeadings";
import TableFunctions from "./table/TableFunctions";
import useEmployee from "@/hooks/employee/useEmployee";

export default function Employees() {
  const { currentPageRows, handlePageChange, totalItems, itemsPerPage, filter, handleFilterChange, setFilter, translate } =
    useEmployee();

  return (
    <>
      <Layout>
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl text-[#222B45] ">{translate("employees.main_heading")}</h1>
          <TableFunctions filter={filter} setFilter={setFilter} handleFilterChange={handleFilterChange} />
        </div>
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
