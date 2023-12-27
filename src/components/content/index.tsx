import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableHeadings from "./table/TableHeadings";
import TableRows from "./table/TableRows";
import useContent from "@/hooks/content/useContent";
import TableFunctions from "./table/TableFunctions";
import { useEmptyStates } from "@/utils/hooks";

export default function Content() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    filter,
    setFilter,
    handleFilterChange,
    loading,
  } = useContent();

  const CurrentComponent = useEmptyStates(
    <TableRows contentData={currentPageRows} />,
    currentPageRows.length > 0,
    loading
  );
  return (
    <>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={() => handleFilterChange(filter)}
      />
      <TableLayout>
        <TableHeadings />
        {CurrentComponent}
      </TableLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </>
  );
}
