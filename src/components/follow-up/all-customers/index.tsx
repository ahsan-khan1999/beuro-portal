import TableLayout from "@/layout/TableLayout";
import React from "react";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRows from "./table/TableRows";
import useAllCustomers from "@/hooks/follow-up/useAllCustomers";
import { AllCustomersTableProps } from "@/types/follow-up";

const AllCustomersTable = ({
  handleCustomerDetail,
}: AllCustomersTableProps) => {
  const { currentPageRows, handlePageChange, totalItems, itemsPerPage } =
    useAllCustomers();

  return (
    <>
      <TableFunctions />
      <TableLayout>
        <TableHeading />
        <TableRows
          currentPageRows={currentPageRows}
          handleCustomerDetail={handleCustomerDetail}
        />
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
