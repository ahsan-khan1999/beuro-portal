import React from "react";
import { Layout } from "@/layout/layout";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableRowServices from "./table/TableRows";
import TableFunctions from "./table/TableFunctions";
import useService from "@/hooks/services/useService";
import TableHeadings from "./table/TableHeadings";

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
  } = useService();

  return (
    <Layout>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
        translate={translate}
      />
      <TableLayout>
        <TableHeadings />
        <TableRowServices servicesData={currentPageRows} />
      </TableLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </Layout>
  );
}
