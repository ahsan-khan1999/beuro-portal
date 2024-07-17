import React from "react";
import { AllCustomersTableProps } from "@/types/follow-up";

const AllCustomersTable = ({
  handleCustomerDetail,
}: AllCustomersTableProps) => {
  // const { currentPageRows, handlePageChange, totalItems, itemsPerPage, filter, setFilter } =
  //   useAllCustomers();

  return (
    <>
      {/* <TableFunctions filter={filter} setFilter={setFilter}/>
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
      /> */}
    </>
  );
};

export default AllCustomersTable;
