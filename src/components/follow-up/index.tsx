import TableLayout from "@/layout/TableLayout";
import React from "react";
import TableHeading from "./table/TableHeading";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import useFollowUps from "@/hooks/follow-up/useFollowUp";
import TableRows from "./table/TableRows";
import TableFunctions from "./table/TableFunctions";
import { FollowUpsTableProps } from "@/types/follow-up";

const FollowUpsTable = ({ handleFollowUpsDetails }: FollowUpsTableProps) => {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    filter,
    setFilter,
    handleDeleteFollowUp,
    renderModal,
    handleFilterChange,
  } = useFollowUps();

  return (
    <>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
      <TableLayout>
        <TableHeading />
        <TableRows
          currentPageRows={currentPageRows}
          handleFollowUpsDetails={handleFollowUpsDetails}
          handleFollowUpsDelete={handleDeleteFollowUp}
        />
      </TableLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      {renderModal()}
    </>
  );
};

export default FollowUpsTable;
