import { useAgentAppointments } from "@/hooks/agent/appointments/useAgentAppointments";
import TableFunctions from "./table/TableFunctions";
import { TableCardLayout } from "@/layout/TableCardLayout";
import TableLayout from "@/layout/TableLayout";
import TableHeadings from "./table/TableHeadings";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import TableRows from "./table/TableRows";
import { useEmptyStates } from "@/utils/hooks";

export const AgentAppointments = () => {
  const {
    handleSubmitReports,
    handleViewReports,
    handlePageChange,
    handleStatusChange,
    renderModal,
    currentPage,
    currentPageRows,
    filter,
    setFilter,
    handleFilterChange,
    itemsPerPage,
    totalCount,
    totalItems,
    isLoading,
  } = useAgentAppointments();

  const CurrentComponent = useEmptyStates(
    <TableRows
      dataToAdd={currentPageRows}
      onStatusChange={handleStatusChange}
      onViewReport={handleViewReports}
      onSubmitReport={handleSubmitReports}
    />,
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
};
