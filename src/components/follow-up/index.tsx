import TableLayout from "@/layout/TableLayout";
import React from "react";
import TableHeading from "./table/TableHeading";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import useFollowUps from "@/hooks/follow-up/useFollowUp";
import TableRows from "./table/TableRows";
import TableFunctions from "./table/TableFunctions";

const FollowUpsTable = ({handleFollowUpsDetails} : {handleFollowUpsDetails:() => void}) => {
  const { currentPageRows, handlePageChange, totalItems, itemsPerPage } =
    useFollowUps();

  return (
    <>
      <TableFunctions />
      <TableLayout>
        <TableHeading />
        <TableRows currentPageRows={currentPageRows} handleFollowUpsDetails={handleFollowUpsDetails}/>
      </TableLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default FollowUpsTable;
