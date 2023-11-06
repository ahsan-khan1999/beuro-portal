import { TableRowEmailTracker } from "@/types/emailTracker";
import { MailTracker } from "@/utils/static";
import React, { useEffect, useState } from "react";

const useEmailTracker = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  // const { modal } = useAppSelector((state) => state.global);
  const [currentPageRows, setCurrentPageRows] = useState<
    TableRowEmailTracker[]
  >([]);

  const totalItems = MailTracker.length;
  const itemsPerPage = 10;

  useEffect(() => {
    // Update rows for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    setCurrentPageRows(
      MailTracker.slice(startIndex, startIndex + itemsPerPage)
    );
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return {
    currentPageRows,
    handlePageChange,
    totalItems,
    itemsPerPage,
  };
};

export default useEmailTracker;
