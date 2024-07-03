import TableLayout from "@/layout/TableLayout";
import React from "react";
import TableHeading from "./table/TableHeading";
import { Pagination } from "@/base-components/ui/pagination/pagination";
import useFollowUps from "@/hooks/follow-up/useFollowUp";
import TableRows from "./table/TableRows";
import TableFunctions from "./table/TableFunctions";
import { FollowUpsTableProps } from "@/types/follow-up";
import { useEmptyStates } from "@/utils/hooks";
import { TableCardLayout } from "@/layout/TableCardLayout";
import { staticEnums } from "@/utils/static";
import { CheckBoxType } from "@/types";

const FollowUpsTable = ({ handleFollowUpsDetails }: FollowUpsTableProps) => {
  const {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
    filter,
    setFilter,
    handleDeleteFollowUp,
    renderModal,
    handleFilterChange,
    loading,
    currentPage,
    clickedIndex,
    handleFollowUpStatusChange,
    totalCount,
  } = useFollowUps();

  const followUpStatuses: CheckBoxType[] = [
    {
      label: translate("follow_up.view_all_follow_up_filters.all"),
      type: `${staticEnums.FollowUp.Status.all}`,
    },
    {
      label: translate("follow_up.view_all_follow_up_filters.today"),
      type: `${staticEnums.FollowUp.Status.today}`,
    },
    {
      label: translate("follow_up.view_all_follow_up_filters.pending"),
      type: `${staticEnums.FollowUp.Status.Pending}`,
    },
    {
      label: translate("follow_up.view_all_follow_up_filters.overdue"),
      type: `${staticEnums.FollowUp.Status.Overdue}`,
    },
    {
      label: translate("follow_up.view_all_follow_up_filters.upcoming"),
      type: `${staticEnums.FollowUp.Status.Upcoming}`,
    },
  ];

  const CurrentComponent = useEmptyStates(
    <TableRows
      currentPageRows={currentPageRows}
      handleFollowUpsDetails={handleFollowUpsDetails}
      handleFollowUpsDelete={handleDeleteFollowUp}
    />,
    totalCount !== 0,
    loading
  );

  return (
    <>
      <TableFunctions
        filter={filter}
        setFilter={setFilter}
        handleFilterChange={handleFilterChange}
      />

      <div className="border-y border-y-[#E0E0E0] mt-[18px] mb-5 flex gap-x-[48px] pb-3">
        {followUpStatuses.map((item, index) => (
          <div
            key={index}
            onClick={() => handleFollowUpStatusChange(index, item.type)}
            className={`text-base font-medium pt-[14px] cursor-pointer border-b-2 ${
              clickedIndex === index
                ? "text-primary border-b-primary"
                : "text-[#404040] border-b-transparent"
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
      <div className="max-h-[500px] overflow-y-scroll">
        <TableCardLayout>
          <TableLayout>
            <TableHeading />
            {CurrentComponent}
          </TableLayout>
        </TableCardLayout>
      </div>
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        isPageInParam={false}
      />
      {renderModal()}
    </>
  );
};

export default FollowUpsTable;
