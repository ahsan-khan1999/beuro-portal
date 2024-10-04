import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import useLeads from "@/hooks/leads/useLeads";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";
import { LeadsTableRows } from "./table/leads-table-rows";
import { LeadsTableFunctions } from "./table/leads-table-functions";
import { LeadsTableHeadings } from "./table/leads-table-headings";

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
    shareImgModal,
  } = useLeads();

  const CurrentComponent = useEmptyStates(
    <LeadsTableRows
      dataToAdd={currentPageRows}
      handleAddNote={handleNotes}
      handleImageUpload={handleImageUpload}
      onStatusChange={handleLeadStatusUpdate}
      onAppointment={handleScheduleAppointments}
      onShareImages={shareImgModal}
      isAgent={false}
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
