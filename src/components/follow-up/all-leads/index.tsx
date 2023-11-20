import TableLayout from "@/layout/TableLayout";
import React from "react";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableHeading from "./table/TableHeading";
import TableRows from "./table/TableRows";
import useAllLeads from "@/hooks/follow-up/useAllLeads";
import { AllLeadsTableProps } from "@/types/follow-up";

const AllLeadsTable = ({ handleLeadDetail }: AllLeadsTableProps) => {
  const { currentPageRows, handlePageChange, totalItems, itemsPerPage,filter,setFilter } =
    useAllLeads();

  return (
    <>
      <TableFunctions filter={filter} setFilter={setFilter}/>
      <TableLayout>
        <TableHeading />
        <TableRows
          currentPageRows={currentPageRows}
          handleLeadDetail={handleLeadDetail}
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

export default AllLeadsTable;
