import { UsePaginationProps } from "@/types";
import { useState, useCallback } from "react";

const PAGE_LIMIT = 5;
export const dots = "•••";

export const usePagination = ({ totalItems, itemsPerPage, onPageChange }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const handlePrevClick = useCallback(() => {
    handlePageClick(currentPage - 1);
  }, [currentPage]);

  const handleNextClick = useCallback(() => {
    handlePageClick(currentPage + 1);
  }, [currentPage]);

  const handlePageClick = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
        onPageChange(page);
      }
    },
    [totalPages, onPageChange]
  );

  // Calculate the range of page numbers to show.
  const startPage = Math.max(1, currentPage - Math.floor(PAGE_LIMIT / 2));
  const endPage = Math.min(totalPages, startPage + PAGE_LIMIT - 1);
  const pagesToShow = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
  console.log(startPage, "start", totalPages);


  return {
    currentPage,
    isFirst,
    isLast,
    pagesToShow: [1, ...pagesToShow, totalPages],

    dots,
    handlePrevClick,
    handleNextClick,
    handlePageClick,
  };
}
