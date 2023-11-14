import TableLayout from "@/layout/TableLayout";
import React from "react";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRows from "./table/TableRows";
import useAllCustomers from "@/hooks/follow-up/useAllCustomers";

const AllCustomersTable = () => {
  const { currentPageRows, handlePageChange, totalItems, itemsPerPage } =
  useAllCustomers();

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

export default AllCustomersTable;
