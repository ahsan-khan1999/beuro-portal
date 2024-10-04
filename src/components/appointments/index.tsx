import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";
import { useAppointments } from "@/hooks/appointments/useAppointments";
import { AppointmentTableRows } from "./table/appointment-table-rows";
import { AppointmentTableFunctions } from "./table/appointment-table-functions";
import { AppointmentTableHeadings } from "./table/apppointment-table-headings";

export default function Appointments() {
  const {
    handlePageChange,
    totalItems,
    itemsPerPage,
    renderModal,
    filter,
    setFilter,
    handleFilterChange,
    loading,
    isLoading,
    currentPage,
    currentPageRows,
    handleAppointmentCreate,
    handleStatusUpdate,
    totalCount,
    handleScheduleAppointments,
    handleNotes,
    handleImageUpload,
  } = useAppointments();

  const CurrentComponent = useEmptyStates(
    <AppointmentTableRows
      dataToAdd={currentPageRows}
      onStatusChange={handleStatusUpdate}
      onAppointmentSchedule={handleScheduleAppointments}
      handleNotes={handleNotes}
      handleImageUpload={handleImageUpload}
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
      />
      <TableCardLayout>
        <TableLayout>
          <AppointmentTableHeadings />
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
