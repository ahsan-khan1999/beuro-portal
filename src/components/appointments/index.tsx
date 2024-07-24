import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableFunctions from "./table/TableFunctions";
import TableRows from "./table/TableRows";
import TableHeadings from "./table/TableHeadings";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";
import { useAppointments } from "@/hooks/appointments/useAppointments";

export default function Appointments() {
  const {
    currentPageRows,
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
    handleAppointmentStatusUpdate,
    totalCount,
    handleScheduleAppointments,
  } = useAppointments();

  const CurrentComponent = useEmptyStates(
    <TableRows
      dataToAdd={currentPageRows}
      onStatusChange={handleAppointmentStatusUpdate}
      onAppointmentSchedule={handleScheduleAppointments}
    />,
    // totalCount !== 0,
    currentPageRows?.length > 0,
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
