import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import useLeads from "@/hooks/leads/useLeads";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";
import { LeadsTableFunctions } from "@/components/leads/table/leads-table-functions";
import { LeadsTableHeadings } from "@/components/leads/table/leads-table-headongs";
import { LeadsTableRows } from "@/components/leads/table/leads-table-rows";

export default function AgentLeads() {
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
    <LeadsTableRows
      dataToAdd={currentPageRows}
      handleAddNote={handleNotes}
      handleImageUpload={handleImageUpload}
      onStatusChange={handleLeadStatusUpdate}
      onAppointment={handleScheduleAppointments}
      isAgent={true}
    />,
    totalCount !== 0,
    isLoading
  );

  return (
    <>
      <LeadsTableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
        isAgent={true}
      />
      <TableCardLayout>
        <TableLayout>
          <LeadsTableHeadings />
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
