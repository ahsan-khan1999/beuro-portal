import React from "react";
import TableLayout from "@/layout/TableLayout";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";
import { useAppointments } from "@/hooks/appointments/useAppointments";
import { AppointmentTableRows } from "./table/appointment-table-rows";
import { AppointmentTableFunctions } from "./table/appointment-table-functions";
import { AppointmentTableHeadings } from "./table/apppointment-table-headings";
import { AppointmentTableRecordCard } from "./mobile/table-record-card";
import NoDataEmptyState from "@/base-components/loadingEffect/no-data-empty-state";

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
    totalCount,
    handleNotes,
    handleImageUpload,
    handleCurrentDateChange,
    handlePdfPreview,
  } = useAppointments();

  const CurrentComponent = useEmptyStates(
    <AppointmentTableRows
      dataToAdd={currentPageRows}
      onStatusChange={handleStatusUpdate}
      onAppointmentCreate={handleAppointmentCreate}
      handleNotes={handleNotes}
      handleImageUpload={handleImageUpload}
      isAgent={true}
      handlePdfPreview={handlePdfPreview}
    />,
    totalCount !== 0,
    isLoading
  );

  return (
    <>
      <AppointmentTableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
        isAgent={true}
        onDateChange={handleCurrentDateChange}
      />

      <div className="block xMini:hidden">
        {currentPageRows && currentPageRows.length > 0 ? (
          <AppointmentTableRecordCard dataToAdd={currentPageRows} />
        ) : (
          <div className="xMini:bg-white mt-6 xMini:flex items-center justify-center">
            <NoDataEmptyState
              containerClassName="xMini:py-[153px]"
              imgClassName="w-14 h-14 xMini:w-fit xMini:h-fit"
              textClassName="text-lg xMini:text-2xl"
              className="py-5 px-3 w-full xMini:py-10 xMini:px-6 xMini:w-[617px]"
            />
          </div>
        )}
      </div>

      <div className="hidden xMini:block">
        <TableCardLayout>
          <TableLayout isAgent={true}>
            <AppointmentTableHeadings />
            {CurrentComponent}
          </TableLayout>
        </TableCardLayout>
      </div>
      {!isLoading && (
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      )}
      {renderModal()}
    </>
  );
}
