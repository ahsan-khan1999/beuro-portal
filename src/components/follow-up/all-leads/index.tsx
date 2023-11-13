import TableLayout from "@/layout/TableLayout";
import React from "react";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRows from "./table/TableRows";
import useAllLeads from "@/hooks/follow-up/useAllLeads";

const AllLeadsTable = () => {
  const { currentPageRows, handlePageChange, totalItems, itemsPerPage } =
  useAllLeads();

  return (
    <>
      <TableFunctions />
      <TableLayout>
        <TableHeading />
        <TableRows currentPageRows={currentPageRows} />
      </TableLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default AllLeadsTable;
