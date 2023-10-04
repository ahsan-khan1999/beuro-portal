import React from "react";
import { PaginationProps } from "@/types";
import { PaginationItem } from "./pagination-item";
import { combineClasses, getButtonClass } from "@/utils/utility";
import { usePagination } from "./usePagination";
import { PageNumber } from "./page-number";

export const Pagination = React.memo(
  ({
    totalItems,
    itemsPerPage,
    onPageChange,
    containerClassName,
  }: PaginationProps) => {
    const {
      currentPage,
      isFirst,
      isLast,
      pagesToShow,
      dots,
      handlePrevClick,
      handleNextClick,
      handlePageClick,
    } = usePagination({ totalItems, itemsPerPage, onPageChange });
    const combineContainerClass = combineClasses(
      "flex justify-end gap-x-2 mt-6",
      containerClassName
    );
    return (
      <div className={combineContainerClass}>
        <PaginationItem
          handlePageClick={handlePrevClick}
          icon="<"
          className={getButtonClass(
            isFirst,
            "cursor-not-allowed opacity-50",
            "hover:bg-gray-200"
          )}
          disabled={isFirst}
        />

        {pagesToShow.map((pageNumber, index, array) => {
          if (index > 0 && pageNumber - array[index - 1] > 1) {
            return (
              <React.Fragment key={pageNumber}>
                <span className="flex justify-center items-center text-gray">
                  {dots}
                </span>
                <PageNumber
                  currentPage={currentPage}
                  pageNumber={pageNumber}
                  handlePageClick={handlePageClick}
                />
              </React.Fragment>
            );
          } else {
            return (
              <PageNumber
                currentPage={currentPage}
                pageNumber={pageNumber}
                handlePageClick={handlePageClick}
              />
            );
          }
        })}

        <PaginationItem
          handlePageClick={handleNextClick}
          icon=">"
          className={getButtonClass(
            isLast,
            "cursor-not-allowed opacity-50",
            "hover:bg-gray-200"
          )}
          disabled={isLast}
        />
      </div>
    );
  }
);