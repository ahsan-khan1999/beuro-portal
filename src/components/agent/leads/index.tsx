import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import useLeads from "@/hooks/leads/useLeads";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";
import { LeadsTableFunctions } from "@/components/leads/table/leads-table-functions";
import { LeadsTableHeadings } from "@/components/leads/table/leads-table-headings";
import { LeadsTableRows } from "@/components/leads/table/leads-table-rows";
import { LeadTableRecordCard } from "./mobile/leads-table-records";

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
    shareImgModal,
    handleScheduleAppointments,
  } = useLeads();

  const CurrentComponent = useEmptyStates(
    <LeadsTableRows
      dataToAdd={currentPageRows}
      handleAddNote={handleNotes}
      handleImageUpload={handleImageUpload}
      onStatusChange={handleLeadStatusUpdate}
      onAppointment={handleScheduleAppointments}
      onShareImages={shareImgModal}
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

      <div className="block xMini:hidden">
        <LeadTableRecordCard isAgent={true} dataToAdd={currentPageRows} />
      </div>
      <div className="hidden xMini:block">
        <TableCardLayout>
          <TableLayout isAgent={true}>
            <LeadsTableHeadings isAgent={true} />
            {CurrentComponent}
          </TableLayout>
        </TableCardLayout>
      </div>
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
