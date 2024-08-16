import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";
import { useAppointments } from "@/hooks/appointments/useAppointments";
import { AppointmentTableRows } from "./table/appointment-table-rows";
import { AppointmentTableFunctions } from "./table/appointment-table-functions";
import { AppointmentTableHeadings } from "./table/apppointment-table-headings";

export default function AgentAppointments() {
  const {
    handlePageChange,
    totalItems,
    itemsPerPage,
    renderModal,
    filter,
    setFilter,
    handleFilterChange,
    isLoading,
    currentPage,
    handleStatusUpdate,
    currentPageRows,
    handleAppointmentCreate,
  } = useAppointments();

  const CurrentComponent = useEmptyStates(
    <AppointmentTableRows
      dataToAdd={currentPageRows}
      onStatusChange={handleStatusUpdate}
      onAppointmentCreate={handleAppointmentCreate}
      isAgent={true}
    />,
    currentPageRows.length > 0,
    isLoading
  );

  return (
    <>
      <AppointmentTableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
        isAgent={true}
      />
      <TableCardLayout>
        <TableLayout isAgent={true}>
          <AppointmentTableHeadings isAgent={true} />
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
