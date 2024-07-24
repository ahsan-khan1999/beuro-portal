import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableRows from "./table/TableRows";
import TableHeadings from "./table/TableHeadings";
import useLeads from "@/hooks/leads/useLeads";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";

export default function Leads() {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    handleNotes,
    handleDeleteNote,
    handleImageUpload,
    renderModal,
    filter,
    setFilter,
    handleFilterChange,
    loading,
    isLoading,
    currentPage,
    handleLeadStatusUpdate,
    totalCount,
    handleScheduleAppointments,
  } = useLeads();

  const CurrentComponent = useEmptyStates(
    <TableRows
      dataToAdd={currentPageRows}
      handleAddNote={handleNotes}
      handleImageUpload={handleImageUpload}
      onStatusChange={handleLeadStatusUpdate}
      onAppointment={handleScheduleAppointments}
    />,
    // currentPageRows.length > 0,
    totalCount !== 0,
    isLoading
  );

  return (
    <>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />
      <TableCardLayout>
        <TableLayout>
          <TableHeadings />
          {CurrentComponent}
        </TableLayout>
      </TableCardLayout>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        currentPage={currentPage}
      />
      {renderModal()}
    </>
  );
}
