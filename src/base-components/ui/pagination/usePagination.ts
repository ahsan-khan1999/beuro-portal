import { UsePaginationProps } from "@/types";
import { useRouter } from "next/router";
import { useState, useCallback, useEffect } from "react";

const PAGE_LIMIT = 5;
export const dots = "•••";

export const usePagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage: defaultPage,
  isPageInParam,
}: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState<number>(defaultPage || 1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;
  const router = useRouter();

  const handlePageClick = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages) {
        // this check is used just for the follow-up in modal
        if (isPageInParam !== false) {
          router.push(
            {
              pathname: router.pathname,
              query: {
                ...router.query,
                page: page,
              },
            },
            undefined,
            { shallow: true }
          );
        }

        setCurrentPage(page);
        onPageChange(page);
      }
    },
    [totalPages, onPageChange]
  );

  const handlePrevClick = () => {
    handlePageClick(currentPage - 1);
  };

  const handleNextClick = () => {
    handlePageClick(currentPage + 1);
  };

  useEffect(() => {
    // router.replace({
    //   pathname: router.pathname,
    //   query: { ...router.query, page: currentPage },
    // });
    setCurrentPage(defaultPage);
  }, [defaultPage]);

  const startPage = Math.max(2, currentPage - Math.floor(PAGE_LIMIT / 2));
  const endPage = Math.min(totalPages - 1, startPage + PAGE_LIMIT - 1);

  const pagesToShow = [
    1,
    ...Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index
    ),
    totalPages,
  ];

  const uniquePagesToShow = [...new Set(pagesToShow)];

  return {
    currentPage,
    isFirst,
    isLast: totalPages < currentPage ? true : isLast,
    pagesToShow: totalPages > 0 ? uniquePagesToShow : [],
    dots,
    handlePrevClick,
    handleNextClick,
    handlePageClick,
  };
};
