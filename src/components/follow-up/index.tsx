import TableLayout from "@/layout/TableLayout";
import React from "react";
import TableHeading from "./table/TableHeading";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import useFollowUps from "@/hooks/follow-up/useFollowUp";
import TableRows from "./table/TableRows";
import TableFunctions from "./table/TableFunctions";
import { FollowUpsTableProps } from "@/types/follow-up";
import { useEmptyStates } from "@/utils/hooks";

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
    loading,
    currentPage
  } = useFollowUps();

  const CurrentComponent = useEmptyStates(
    <TableRows
      currentPageRows={currentPageRows}
      handleFollowUpsDetails={handleFollowUpsDetails}
      handleFollowUpsDelete={handleDeleteFollowUp}
    />,
    currentPageRows.length > 0,
    loading
  );

  return (
    <>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
      <TableLayout>
        <TableHeading />
        {CurrentComponent}
      </TableLayout>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      {renderModal()}
    </>
  );
};

export default FollowUpsTable;
